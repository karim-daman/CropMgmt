<script lang="ts">
	import { onMount } from 'svelte';
	import { check, type UpdateResult } from '@tauri-apps/plugin-updater';
	import { relaunch } from '@tauri-apps/plugin-process';
	import toast from 'svelte-5-french-toast';

	/**
	 * Interface defining the structure of download progress events
	 */
	interface DownloadEvent {
		event: 'Started' | 'Progress' | 'Finished';
		data: {
			contentLength?: number;
			chunkLength?: number;
		};
	}

	/**
	 * State management for update information
	 */
	let updateAvailable: boolean = false;
	let updateVersion: string = '';
	let updateDate: string = '';
	let updateNotes: string = '';
	let downloading: boolean = false;
	let downloadProgress: number = 0;
	let totalSize: number = 0;
	let error: string | null = null;

	/**
	 * Checks for available updates by communicating with the update server
	 * Sets update information if a new version is available
	 */
	async function checkForUpdates(): Promise<void> {
		try {
			// Reset error state before checking
			error = null;

			// Attempt to fetch update information
			const update: UpdateResult | null = await check();

			if (update) {
				// Update information found - populate the state
				updateAvailable = true;
				updateVersion = update.version;
				updateDate = new Date(update.date).toLocaleDateString();
				updateNotes = update.body;

				console.log('Update found:', {
					version: updateVersion,
					date: updateDate,
					notes: updateNotes
				});

				toast.success(
					'Update found: \n' +
						JSON.stringify(
							{
								version: updateVersion,
								date: updateDate,
								notes: updateNotes
							},
							null,
							2
						)
				);
			} else {
				console.log('No updates available');
				toast.success('No updates available ');
				updateAvailable = false;
			}
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
			error = `Error checking for updates: ${errorMessage}`;
			toast.success(`Error checking for updates: ${errorMessage}`);
			console.error('Update check failed:', error);
		}
	}

	/**
	 * Handles the download and installation of available updates
	 * Includes progress tracking and automatic relaunch
	 */
	async function downloadAndInstallUpdate(): Promise<void> {
		try {
			// Verify update is available before proceeding
			const update: UpdateResult | null = await check();
			if (!update) {
				console.log('No update available to install');
				toast.success('No update available to install');
				return;
			}

			// Initialize download state
			downloading = true;
			downloadProgress = 0;
			let downloaded: number = 0;

			// Start download and installation process
			await update.downloadAndInstall((event: DownloadEvent) => {
				switch (event.event) {
					case 'Started':
						if (event.data.contentLength) {
							totalSize = event.data.contentLength;
							console.log('Download started. Total size:', totalSize);
							toast.success('Download started. Total size: ' + totalSize);
						}
						break;
					case 'Progress':
						if (event.data.chunkLength) {
							downloaded += event.data.chunkLength;
							downloadProgress = (downloaded / totalSize) * 100;
							console.log(`Download progress: ${downloadProgress.toFixed(1)}%`);
							toast.success(`Download progress: ${downloadProgress.toFixed(1)}%`);
						}
						break;
					case 'Finished':
						downloading = false;
						console.log('Download completed');
						toast.success('Download completed');
						break;
				}
			});

			// Relaunch application to apply update
			console.log('Relaunching application...');
			toast.success('Relaunching application...');
			await relaunch();
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
			error = `Error installing update: ${errorMessage}`;
			downloading = false;
			console.error('Update installation failed:', error);
			toast.success('Update installation failed: ' + error);
		}
	}
</script>

<div class="update-container">
	<button
		class="pressable rounded-sm border px-2"
		on:click={checkForUpdates}
		disabled={downloading}>
		Check for Updates
	</button>

	{#if error}
		<div class="error" role="alert">
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
				<button
					on:click={downloadAndInstallUpdate}
					class="update-button"
					aria-label="Download and install update version {updateVersion}">
					Download and Install
				</button>
			{:else}
				<div
					class="progress-container"
					role="progressbar"
					aria-valuenow={downloadProgress}
					aria-valuemin="0"
					aria-valuemax="100">
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

	.update-button:disabled {
		background-color: #9ca3af;
		cursor: not-allowed;
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
