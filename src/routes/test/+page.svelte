<script lang="ts">
	import { onMount } from 'svelte';
	import { check } from '@tauri-apps/plugin-updater';
	import { relaunch } from '@tauri-apps/plugin-process';
	import toast from 'svelte-5-french-toast';

	let updateAvailable = false;
	let updateVersion = '';
	let updateNotes = '';
	let downloadProgress = 0;
	let downloading = false;

	export async function checkForUpdates() {
		try {
			const update = await check();
			if (update) {
				updateAvailable = true;
				updateVersion = update.version;
				updateNotes = update.body;
				let downloaded = 0;
				let contentLength = 0;

				downloading = true;
				await update.downloadAndInstall((event) => {
					switch (event.event) {
						case 'Started':
							contentLength = event.data.contentLength;
							console.log(`Started downloading ${contentLength} bytes`);
							break;
						case 'Progress':
							downloaded += event.data.chunkLength;
							downloadProgress = Math.round((downloaded / contentLength) * 100);
							break;
						case 'Finished':
							console.log('Download finished');
							downloading = false;
							break;
					}
				});

				console.log('Update installed, relaunching...');
				await relaunch();
			}
		} catch (error) {
			console.error('Error checking for updates:', error);
		}
	}

	onMount(() => {
		checkForUpdates();
	});
</script>

{#if updateAvailable}
	<p>New update available: v{updateVersion}</p>
	<p>{updateNotes}</p>
	{#if downloading}
		<p>Downloading... {downloadProgress}%</p>
	{/if}
{:else}
	<p>up to date!</p>
{/if}
