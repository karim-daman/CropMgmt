<script>
	import { getVersion } from '@tauri-apps/api/app';

	let version = '';

	getVersion().then((v) => (version = v));

	import { check } from '@tauri-apps/plugin-updater';
	import { relaunch } from '@tauri-apps/plugin-process';

	// Reactive states
	let checking = false;
	let downloading = false;
	let installing = false;
	let error = null;
	let progress = {
		downloaded: 0,
		total: 0,
		percentage: 0
	};
	let updateInfo = null;

	async function checkForUpdates() {
		checking = true;
		error = null;

		try {
			console.log('Checking for updates...');
			const update = await check();

			if (update) {
				console.log(`Update found: v${update.version} (${update.date})`);
				console.log('Release notes:', update.body);
				updateInfo = update;
				await handleUpdate(update);
			} else {
				console.log('No updates available');
			}
		} catch (err) {
			console.error('Error checking for updates:', err);
			error = `Failed to check for updates: ${err.message}`;
		} finally {
			checking = false;
		}
	}

	async function handleUpdate(update) {
		downloading = true;
		progress = { downloaded: 0, total: 0, percentage: 0 };

		try {
			await update.downloadAndInstall((event) => {
				switch (event.event) {
					case 'Started':
						console.log(`Download started - Total size: ${event.data.contentLength} bytes`);
						progress.total = event.data.contentLength;
						break;

					case 'Progress':
						progress.downloaded += event.data.chunkLength;
						progress.percentage = Math.round((progress.downloaded / progress.total) * 100);
						console.log(
							`Download progress: ${progress.percentage}% (${progress.downloaded}/${progress.total} bytes)`
						);
						break;

					case 'Finished':
						console.log('Download completed successfully');
						break;
				}
			});

			console.log('Update installed successfully');
			installing = true;

			// Small delay to ensure user sees the success message
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log('Relaunching application...');
			await relaunch();
		} catch (err) {
			console.error('Error during update process:', err);
			error = `Update failed: ${err.message}`;
			downloading = false;
			installing = false;
		}
	}
</script>

<main>
	<h1>App Version: {version}</h1>
</main>

<div class="updater-container">
	{#if error}
		<div class="error-message">
			{error}
			<button on:click={checkForUpdates}>Try Again</button>
		</div>
	{/if}

	{#if checking}
		<div class="status">Checking for updates...</div>
	{:else if downloading}
		<div class="status">
			<div class="download-progress">
				Downloading update ({progress.percentage}%)
				<div class="progress-bar">
					<div class="progress-fill" style="width: {progress.percentage}%"></div>
				</div>
				<div class="progress-details">
					{Math.round(progress.downloaded / 1024)} KB / {Math.round(progress.total / 1024)} KB
				</div>
			</div>
		</div>
	{:else if installing}
		<div class="status">Installing update...</div>
	{:else if updateInfo}
		<div class="update-info">
			<h3>Update Available</h3>
			<p>Version: {updateInfo.version}</p>
			<p>Release Date: {updateInfo.date}</p>
			<div class="release-notes">
				<h4>Release Notes:</h4>
				<p>{updateInfo.body}</p>
			</div>
		</div>
	{:else}
		<div class="check-update">
			<button on:click={checkForUpdates}>Check for Updates</button>
			{#if !error}
				<span class="status">Click to check for updates</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.updater-container {
		padding: 1rem;
		border-radius: 0.5rem;
		background: #f9f9f9;
	}

	.error-message {
		color: #dc2626;
		margin-bottom: 1rem;
	}

	.status {
		color: #374151;
		margin-left: 1rem;
	}

	.check-update {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.download-progress {
		margin: 1rem 0;
	}

	.progress-bar {
		width: 100%;
		height: 0.5rem;
		background: #e5e7eb;
		border-radius: 0.25rem;
		margin: 0.5rem 0;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #3b82f6;
		transition: width 0.2s ease;
	}

	.progress-details {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.update-info {
		padding: 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
	}

	button {
		background: #3b82f6;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: none;
		cursor: pointer;
	}

	button:hover {
		background: #2563eb;
	}
</style>
