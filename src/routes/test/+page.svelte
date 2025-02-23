<script lang="ts">
	import { onMount } from 'svelte';
	import { check, type Update, type DownloadEvent } from '@tauri-apps/plugin-updater';

	let currentVersion: string = 'Loading...';
	let newVersion: string = 'Loading...';
	let updateAvailable: boolean = false;
	let updateInProgress: boolean = false;
	let downloadProgress: number = 0;
	let updateError: string | null = null;

	let updateInstance: Update | null = null;

	// Helper function to compare versions
	function isNewerVersion(newVersion: string, currentVersion: string): boolean {
		const newParts = newVersion.split('.').map(Number);
		const currentParts = currentVersion.split('.').map(Number);

		for (let i = 0; i < newParts.length; i++) {
			if (newParts[i] > currentParts[i]) return true;
			if (newParts[i] < currentParts[i]) return false;
		}
		return false;
	}

	let updateResults;

	// Function to check for updates
	async function checkForUpdates() {
		try {
			const update = await check();
			console.log('Update response:', update); // Debugging: Log the response
			updateResults = update;
			if (update) {
				updateInstance = update;
				currentVersion = update.currentVersion;
				newVersion = update.version;
				updateAvailable = update.available || isNewerVersion(newVersion, currentVersion); // Fallback to manual comparison
				console.log('Update available:', updateAvailable); // Debugging: Log availability
			} else {
				updateAvailable = false;
				updateError = 'No updates available.';
			}
		} catch (error) {
			updateError = 'Failed to check for updates: ' + (error as Error).message;
			console.error('Error checking for updates: ', error); // Debugging: Log errors
		}
	}

	// Function to download and install the update
	async function downloadAndInstallUpdate() {
		if (!updateInstance) return;

		updateInProgress = true;
		updateError = null;

		try {
			await updateInstance.downloadAndInstall((event: DownloadEvent) => {
				if (event.event === 'Progress') {
					downloadProgress = (event.data.chunkLength / 100) * 100; // Adjust based on actual content length if available
				}
			});

			// Reset progress and indicate success
			downloadProgress = 100;
			updateInProgress = false;
			alert('Update installed successfully! Restart the application to apply the update.');
		} catch (error) {
			updateError = 'Failed to download or install update: ' + (error as Error).message;
			updateInProgress = false;
		}
	}

	// Check for updates when the component mounts
	onMount(() => {
		checkForUpdates();
	});
</script>

<div>
	<h1>Update Manager</h1>

	<div>
		<p>Current Version: {currentVersion}</p>
		<p>New Version: {newVersion}</p>
	</div>

	{#if updateAvailable}
		<div>
			<p>An update is available!</p>
			<button on:click={downloadAndInstallUpdate} disabled={updateInProgress}>
				{updateInProgress ? 'Downloading...' : 'Download and Install Update'}
			</button>
			{#if updateInProgress}
				<progress value={downloadProgress} max="100"></progress>
			{/if}
		</div>
	{:else if updateError}
		<p style="color: red;">{updateError}</p>
	{:else}
		<p>No updates available.</p>
	{/if}
</div>

<div>
	{#if updateResults}
		{JSON.stringify(updateResults, null, 2)}
	{/if}
</div>
