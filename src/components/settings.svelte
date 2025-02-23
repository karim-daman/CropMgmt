<script lang="ts">
	import { settings } from '../components/icons';
	let toggle: Boolean = false;

	let options: string[] = ['Profile', 'Language', 'Check for updates', 'About'];
</script>

<div class="relative inline-block text-left">
	<div>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button
			onclick={() => {
				toggle = !toggle;
			}}
			type="button"
			class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 transition-all duration-300 hover:rotate-180">
				<path stroke-linecap="round" stroke-linejoin="round" d={settings} />
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
			</svg>
		</button>
	</div>

	<div
		class="absolute right-0 mt-2 overflow-hidden transition-all duration-300 {toggle
			? 'h-auto'
			: 'h-0 outline-hidden'} z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1">
		{#each options as option}
			<div class="py-1" role="none">
				<a
					onclick={() => {
						toggle = false;
					}}
					href="#"
					class="pressable block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0">{option}</a>
			</div>
		{/each}
	</div>
</div>
