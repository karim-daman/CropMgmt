<script lang="ts">
	import { getVersion } from '@tauri-apps/api/app';
	import { check } from '@tauri-apps/plugin-updater';
	import { relaunch } from '@tauri-apps/plugin-process';
	import { translation } from '$lib/i18n';

	export let hidden = true;

	// Reactive states
	let version = '';
	let checking = false;
	let downloading = false;
	let installing = false;
	let error: string | null = null;
	let progress = {
		downloaded: 0,
		total: 0,
		percentage: 0
	};
	let updateInfo: any = null;

	let update: any;

	// Get the current version of the app
	getVersion().then((v) => (version = v));

	// Function to check for updates
	async function checkForUpdates() {
		checking = true;
		error = null;

		try {
			console.log('Checking for updates...');
			update = await check();

			if (update) {
				console.log(`Update found: v${update.version} (${update.date})`);
				updateInfo = update;
			} else {
				console.log('No updates available');
			}
		} catch (err: any) {
			console.error('Error checking for updates:', err);
			error = `Failed to check for updates: ${err.message}`;
		} finally {
			checking = false;
		}
	}

	// Function to handle the update installation
	async function installUpdate() {
		if (!update) {
			console.error('No update available to install');
			return;
		}

		downloading = true;
		progress = { downloaded: 0, total: 0, percentage: 0 };

		try {
			await update.downloadAndInstall((event: any) => {
				switch (event.event) {
					case 'Started':
						progress.total = event.data.contentLength;
						break;
					case 'Progress':
						progress.downloaded += event.data.chunkLength;
						progress.percentage = Math.round((progress.downloaded / progress.total) * 100);
						break;
				}
			});

			installing = true;

			await relaunch();
		} catch (err: any) {
			console.error('Error during update process:', err);
			error = `Update failed: ${err}`;
			downloading = false;
			installing = false;
		}
	}
</script>

<div class="py-1" role="none">
	<a
		on:click={() => (hidden = !hidden)}
		href="#"
		class="pressable relative block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
		role="menuitem"
		tabindex="-1"
		id="menu-item-0">
		{$translation('settings.about')}
		{#if update?.updateAvailable}
			<div
				class="absolute end-6 top-1.5 inline-flex h-6 w-22 items-center justify-center rounded-md border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
				New Version!
			</div>
		{/if}
	</a>
</div>

<div
	id="popup-modal"
	tabindex="-1"
	class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity {hidden
		? 'pointer-events-none opacity-0'
		: 'opacity-100'}">
	<div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
		<div class="space-y-4">
			{#if error}
				<div class="rounded-md bg-red-50 p-4 text-sm text-red-600">
					{error}
					<button
						on:click={checkForUpdates}
						class="mt-2 w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
						Try Again
					</button>
				</div>
			{/if}

			{#if checking}
				<div class="text-center text-gray-600 dark:text-gray-400">Checking for updates...</div>
			{:else if updateInfo}
				<div class=" space-y-4">
					<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Update Available</h3>

					<div class="mb-4 text-xs">
						<span
							class="rounded-sm border border-orange-400 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-gray-700 dark:text-orange-400">
							v{version}
						</span>
					</div>

					<span
						class="relative rounded-sm border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-purple-400">
						v{updateInfo.version}
					</span>
					<div
						class="inline-flex h-6 scale-75 animate-bounce items-center justify-center rounded-full border-2 border-white bg-red-500 p-2 text-xs font-bold text-white dark:border-gray-900">
						NEW!
					</div>

					<p class="text-xs text-gray-600 dark:text-gray-400">
						Release Date: {updateInfo.date}
					</p>

					<div class="text-sm text-gray-600 dark:text-gray-400">
						<h4 class="font-medium">Release Notes:</h4>
						<p>{updateInfo.body}</p>
					</div>
				</div>
			{:else if downloading}
				<div class="space-y-2">
					<p class="text-sm text-gray-600 dark:text-gray-400">
						Downloading update ({progress.percentage}%)
					</p>
					<div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
						<div class="h-2 rounded-full bg-blue-600" style="width: {progress.percentage}%"></div>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						{Math.round(progress.downloaded / 1024)} KB / {Math.round(progress.total / 1024)} KB
					</p>
				</div>
			{:else if installing}
				<div class="text-center text-gray-600 dark:text-gray-400">Installing update...</div>
			{:else}
				<div class="mb-4 text-xs">
					<span
						class="rounded-sm border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-400">
						v{version}
					</span>
				</div>
			{/if}

			<div class="flex gap-2">
				{#if updateInfo}
					<button
						on:click={installUpdate}
						class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
						Install Update
					</button>
				{:else}
					<button
						on:click={checkForUpdates}
						class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
						Check for Updates
					</button>
				{/if}

				<button
					on:click={() => (hidden = true)}
					class=" w-full rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">
					Cancel
				</button>
			</div>
		</div>
	</div>
</div>
