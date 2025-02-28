<script>
	import { onMount } from 'svelte';
	import { translation, locale, locales } from '../lib/i18n';
	// import { clickOutside } from "../lib/clickOutside";
	import toast from 'svelte-5-french-toast';
	import { clickOutside } from '$lib/clickOuside';

	let langs = [];
	let selectedLang = 'en';
	let isOpen = false;

	onMount(() => {
		langs = locales;
		selectedLang = langs[0];
	});

	function handleToggle() {
		isOpen = !isOpen;
	}

	function clickOut() {
		isOpen = false;
	}

	function selectLang(lang) {
		console.log(lang);
		selectedLang = lang;
		$locale = lang;
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
					console.log(l);
					selectedLang = l;
					$locale = l;
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
