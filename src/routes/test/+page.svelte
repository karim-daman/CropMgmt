<script>
	import { onMount } from 'svelte';
	import { check } from '@tauri-apps/plugin-updater';
	import { relaunch } from '@tauri-apps/plugin-process';

	let updateAvailable = false;
	let updateVersion = '';
	let updateDate = '';
	let updateNotes = '';
	let downloading = false;
	let downloadProgress = 0;
	let totalSize = 0;
	let error = null;

	async function checkForUpdates() {
		try {
			const update = await check();

			if (update) {
				updateAvailable = true;
				updateVersion = update.version;
				updateDate = new Date(update.date).toLocaleDateString();
				updateNotes = update.body;
			}
		} catch (err) {
			error = `Error checking for updates: ${err.message}`;
		}
	}

	async function downloadAndInstallUpdate() {
		try {
			const update = await check();
			if (!update) return;

			downloading = true;
			downloadProgress = 0;
			let downloaded = 0;

			await update.downloadAndInstall((event) => {
				switch (event.event) {
					case 'Started':
						totalSize = event.data.contentLength;
						break;
					case 'Progress':
						downloaded += event.data.chunkLength;
						downloadProgress = (downloaded / totalSize) * 100;
						break;
					case 'Finished':
						downloading = false;
						break;
				}
			});

			await relaunch();
		} catch (err) {
			error = `Error installing update: ${err.message}`;
			downloading = false;
		}
	}

	// onMount(() => {
	// 	checkForUpdates();
	// });
</script>

<div class="update-container">
	<button class="pressable rounded-sm border px-2" onclick={checkForUpdates}
		>check for update</button>

	{#if error}
		<div class="error">
			{error}
		</div>
	{/if}

	{#if updateAvailable}
		<div class="update-info">
			<h2>Update Available!</h2>
			<p>Version: {updateVersion}</p>
			<p>Released: {updateDate}</p>
			<div class="update-notes">
				<h3>Release Notes:</h3>
				<p>{updateNotes}</p>
			</div>

			{#if !downloading}
				<button onclick={downloadAndInstallUpdate} class="update-button">
					Download and Install
				</button>
			{:else}
				<div class="progress-container">
					<div class="progress-bar" style="width: {downloadProgress}%"></div>
					<span class="progress-text">
						{downloadProgress.toFixed(1)}%
					</span>
				</div>
			{/if}
		</div>
	{:else}
		<p>Your application is up to date!</p>
	{/if}
</div>

<style>
	.update-container {
		padding: 1rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.error {
		background-color: #fee2e2;
		border: 1px solid #ef4444;
		color: #dc2626;
		padding: 0.75rem;
		border-radius: 0.375rem;
		margin-bottom: 1rem;
	}

	.update-info {
		background-color: #f3f4f6;
		padding: 1.5rem;
		border-radius: 0.5rem;
	}

	.update-notes {
		margin: 1rem 0;
		padding: 1rem;
		background-color: white;
		border-radius: 0.375rem;
	}

	.update-button {
		background-color: #3b82f6;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.375rem;
		border: none;
		cursor: pointer;
		font-weight: 600;
	}

	.update-button:hover {
		background-color: #2563eb;
	}

	.progress-container {
		margin-top: 1rem;
		background-color: #e5e7eb;
		border-radius: 0.25rem;
		overflow: hidden;
		position: relative;
		height: 1.5rem;
	}

	.progress-bar {
		background-color: #3b82f6;
		height: 100%;
		transition: width 0.3s ease;
	}

	.progress-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-weight: 600;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
	}
</style>
