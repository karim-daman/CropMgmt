<script lang="ts">
	import { entretiens, history } from '$lib/stores';
	import type { Action, Card } from '$lib/types';
	import toast from 'svelte-5-french-toast';
	export let ID: number;
	export let selectedCompany: string;
	export let hidden = true;

	function deleteCard() {
		// Remove the card from the selected company's array
		let tempObj: Card = $entretiens[selectedCompany].find((card: Card) => card.id == ID);
		$entretiens[selectedCompany] = $entretiens[selectedCompany].filter(
			(card: Card) => card.id !== ID
		);

		console.log(JSON.stringify(tempObj));

		toast.success('Deleted a card.', {
			position: 'top-right'
		});

		hidden = true;

		let newHistoryItem: Action = {
			name: 'del|Deleted an entretien.',
			date: new Date(),
			status: 'M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...tempObj }
		};

		$history = [...$history, { ...newHistoryItem }];
	}
</script>

<button onclick={() => (hidden = !hidden)} class="text-red-500 hover:text-red-700"> × </button>

<div
	id="popup-modal"
	tabindex="-1"
	class="transit {hidden
		? 'disappear'
		: ' appear'} fixed z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-xs backdrop-brightness-50 md:inset-0"
>
	<div class="relative max-h-full w-full max-w-md p-4">
		<div class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
			<button
				onclick={() => {
					hidden = !hidden;
				}}
				type="button"
				class="pressable absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				data-modal-hide="popup-modal"
			>
				<svg
					class="h-3 w-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
				<span class="sr-only">Close modal</span>
			</button>
			<div class="p-4 text-center md:p-5">
				<svg
					class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want to delete card ID: {ID}?
				</h3>
				<button
					onclick={() => {
						deleteCard();
					}}
					data-modal-hide="popup-modal"
					type="button"
					class="pressable inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-800"
				>
					Yes, I'm sure
				</button>
				<button
					onclick={() => {
						hidden = !hidden;
					}}
					data-modal-hide="popup-modal"
					type="button"
					class=" pressable ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
					>No, cancel</button
				>
			</div>
		</div>
	</div>
</div>
