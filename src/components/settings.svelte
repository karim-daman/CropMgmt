<script lang="ts">
	import { clickOutside } from '$lib/clickOuside';
	import { settings } from '../components/icons';
	import About from './about.svelte';
	import Contact from './contact.svelte';
	import LanguageSelect from './languageSelect.svelte';
	let isOpen: Boolean = false;

	let options: string[] = ['About', 'Contact'];
</script>

<div class="relative inline-block text-left">
	<div>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			use:clickOutside
			on:outsideclick={() => {
				isOpen = false;
			}}
			on:click={() => {
				isOpen = !isOpen;
			}}
			type="button"
			class="pressable inline-flex w-full justify-center rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-4 transition-all duration-300 hover:rotate-180">
				<path stroke-linecap="round" stroke-linejoin="round" d={settings} />
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>
		</button>
	</div>

	<div
		class="absolute right-0 mt-2 overflow-hidden transition-all duration-100
		{isOpen
			? 'h-auto '
			: 'h-0 outline-hidden'} z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-black/5 bg-white shadow-lg"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1">
		{#each options as option}
			{#if option == 'About'}
				<About />
			{:else if option == 'Contact'}
				<Contact />
			{:else}
				<div class="cursor-pointer py-1" role="none">
					<a
						on:click={() => {
							isOpen = false;
						}}
						href="#"
						class="pressable block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden"
						role="menuitem"
						tabindex="-1"
						id="menu-item-0">{option}</a>
				</div>
			{/if}
		{/each}
	</div>
</div>
