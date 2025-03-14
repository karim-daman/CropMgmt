<script lang="ts">
	import { onMount } from 'svelte';
	import { locale, locales } from '../lib/i18n';
	import toast from 'svelte-5-french-toast';
	import { clickOutside } from '$lib/clickOuside';

	let langs: string[] = [];
	let selectedLang: string; // No need to initialize here; it will be set in onMount
	let isOpen = false;

	// Initialize selectedLang with the value from the locale store
	onMount(() => {
		langs = locales;

		// Set selectedLang to the current value of the locale store
		selectedLang = $locale;

		// Subscribe to changes in the locale store to keep selectedLang in sync
		const unsubscribe = locale.subscribe((value) => {
			selectedLang = value;
		});

		// Cleanup the subscription when the component is destroyed
		return () => unsubscribe();
	});

	function handleToggle() {
		isOpen = !isOpen;
	}
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			use:clickOutside
			on:outsideclick={() => {
				isOpen = false;
			}}
			on:click={handleToggle}
			type="button"
			class="pressable inline-flex w-full cursor-pointer justify-center rounded-sm bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true">
			<img
				src="flag_icons/{selectedLang}.svg"
				class="pointer-events-none w-4 rounded-full border"
				alt="" />
		</button>
	</div>

	<div
		class="z-10 transition duration-100 ease-in-out
		{isOpen
			? 'scale-100 opacity-100'
			: 'pointer-events-none scale-95 opacity-0'} absolute left-0 mt-2 w-56 origin-top-left rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
		{#each langs as l}
			<button
				on:click={() => {
					selectedLang = l; // Update selectedLang
					$locale = l; // Update the locale store (which will also update localStorage)
					toast.success('Language set to ' + l, {
						position: 'top-right'
					});
					isOpen = false;
				}}
				class="pressable flex w-full cursor-pointer py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-none">
				<img
					src="flag_icons/{l}.svg"
					class="pointer-events-none ml-4 w-5 rounded-full border"
					alt="" />
				<p class="mx-2 ml-16">
					{#if l == 'ar'}
						العربية
						<!-- ع -->
					{:else if l == 'en'}
						English
					{:else if l == 'es'}
						Español
					{:else if l == 'fr'}
						Français
					{:else}
						{l}
					{/if}
				</p>
			</button>
		{/each}
	</div>
</div>
