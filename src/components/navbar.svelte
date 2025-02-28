<script lang="ts">
	import { translation } from '$lib/i18n';
	import { card, clientIcons, wrenchIcon, calandarIcon, truckIcon } from './icons';
	import LanguageSelect from './languageSelect.svelte';
	import Settings from './settings.svelte';

	let selected = '';
	let expandedLinks = false;

	const toggleLinks = () => {
		expandedLinks = !expandedLinks;
	};

	$: links = [
		$translation('navbar.procurements'),
		$translation('navbar.clients'),
		$translation('navbar.maintenance'),
		$translation('navbar.attendance'),
		$translation('navbar.delivery')
	];

	$: hrefs = ['achats', 'clients', 'entretien', 'pointage', 'livraison'];

	let icons: string[] = [card, clientIcons, wrenchIcon, calandarIcon, truckIcon];
</script>

<nav
	class="no-print mx-auto block w-full max-w-screen-lg rounded-md bg-slate-100 px-4 shadow-md lg:px-8">
	<div
		class="container mx-auto flex flex-wrap items-center justify-between border-b border-gray-200 text-slate-800">
		<div>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<a
				onclick={() => {
					selected = '/';
				}}
				href="/"
				class="{selected == '/'
					? 'bg-slate-700 text-white '
					: ''} pressable mr-4 block cursor-pointer rounded-sm p-1 text-base font-semibold text-slate-600 hover:bg-slate-700 hover:text-white">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
				</svg>
			</a>
		</div>

		<!-- Desktop Navigation -->
		<div class="hidden md:block">
			<ul class="mt-2 mb-4 flex flex-col gap-2 md:mb-0 md:flex-row md:items-center md:gap-6">
				{#each links as link, i}
					<li
						class="pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white {selected ==
						link
							? 'bg-slate-700 text-white '
							: ''} ">
						<a
							onclick={() => {
								selected = link;
							}}
							href="/{hrefs[i]}"
							class="flex w-32 items-center gap-x-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d={icons[i]} />
							</svg>

							{link}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Mobile Menu Button -->
		<button
			onclick={toggleLinks}
			class="relative ml-auto h-10 w-10 rounded-lg text-center align-middle transition-all select-none hover:bg-gray-100 md:hidden"
			type="button"
			aria-label="Toggle navigation menu">
			<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-6"
					fill="none"
					stroke="currentColor"
					stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</span>
		</button>

		<!-- Mobile Navigation -->
		<div
			class="w-full transition-all duration-300 ease-in-out md:hidden {expandedLinks
				? 'max-h-64 opacity-100'
				: 'max-h-0  overflow-hidden opacity-0'}">
			<ul class="mt-2 flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
				{#each links as link, i}
					<li
						class="pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white {selected ==
						link
							? 'bg-slate-700 text-white '
							: ''} ">
						<a
							onclick={() => {
								selected = link;
							}}
							href="/{hrefs[i]}"
							class="flex w-32 items-center gap-x-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6">
								<path stroke-linecap="round" stroke-linejoin="round" d={icons[i]} />
							</svg>

							{link}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="container mx-auto mt-1 flex flex-wrap justify-between text-slate-800">
		<div class="flex w-full flex-wrap justify-between md:flex-nowrap">
			<LanguageSelect />
			<Settings />
		</div>
	</div>
</nav>
