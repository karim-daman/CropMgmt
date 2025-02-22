<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { achats, history, initializeAchatsStore } from '../../lib/stores';
	import { type AchatRow, type Action } from '../../lib/types';
	import DeleteModal from './deleteModal.svelte';
	import { onMount } from 'svelte';

	let selectedCompany = 'Cnh';
	const companies = ['Cnh', 'Goweil', 'General'];
	let newRow: AchatRow = {
		id: 0,
		article: '',
		prix: 0,
		quantity: 1,
		total: 0
	};

	onMount(async () => {
		if ($achats[selectedCompany] == undefined) {
			await initializeAchatsStore();
		}
	});

	function addRow() {
		if (!newRow.article || !newRow.prix || !newRow.quantity) {
			toast.error('Please fill in all required fields ( article, price, and quantity).', {
				position: 'top-right'
			});
			return;
		}

		newRow.id = Date.now();
		newRow.total = newRow.prix * newRow.quantity;

		$achats = {
			...$achats,
			[selectedCompany]: [...($achats[selectedCompany] || []), { ...newRow }]
		};

		toast.success('Added a new achat.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'cre|Added a new achat.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		newRow = { id: 0, article: '', prix: 0, quantity: 1, total: 0 };
	}

	let oldRow: AchatRow;
	let editMode: boolean = false;

	function edit(currentRow: AchatRow) {
		oldRow = currentRow;
		console.log(JSON.stringify(currentRow, null, 2));

		editMode = true;

		newRow = {
			id: currentRow.id,
			article: currentRow.article,
			prix: currentRow.prix,
			quantity: currentRow.quantity,
			total: currentRow.total
		};

		console.log(newRow.prix + ' ' + newRow.quantity + ' ' + newRow.total);
	}

	function save() {
		if (!newRow.article || !newRow.prix || !newRow.quantity) {
			toast.error('fields that have * are mandatory.', {
				position: 'top-right'
			});
			cancel();
			return;
		}

		newRow.total = newRow.prix * newRow.quantity;

		$achats[selectedCompany] = $achats[selectedCompany].map((row) =>
			row.id === oldRow.id ? newRow : row
		);
		// $pointages.map((row) => (row.ID === oldRow.ID ? console.log(newRow) : console.log(row)));/// when deleting a row, saving it after should be impossible but it's not. find out why ?

		let newHistoryItem: Action = {
			name: 'upd|Edited an achat.',
			date: new Date(),
			status:
				'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
			object: { ...newRow },
			objectOld: { ...oldRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		toast.success('Edited an achat.', {
			position: 'top-right'
		});

		cancel();
	}

	function cancel() {
		newRow = { id: 0, article: '', prix: 0, quantity: 1, total: 0 };
		editMode = false;
	}
</script>

<div class="rounded bg-white p-6 shadow">
	<div class="flex justify-between">
		<h1 class="mb-4 text-2xl font-bold">Achats</h1>

		<p class="no-print text-xs">(fields that have * are mandatory)</p>
	</div>

	<div class=" mb-4 flex space-x-4">
		{#each companies as company}
			<button
				onclick={() => (selectedCompany = company)}
				class="pressable rounded border px-4 py-2 {selectedCompany === company
					? 'bg-blue-500 text-white'
					: ''} "
				class:selected={selectedCompany === company}>
				{company}
			</button>
		{/each}
	</div>

	<div class="no-print mb-4 grid grid-cols-4 gap-4">
		<div class="relative">
			<input
				type="text"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder="Article"
				bind:value={newRow.article} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Article *</label>
		</div>

		<div class="relative">
			<input
				type="number"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder="Prix"
				bind:value={newRow.prix} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Prix *</label>
		</div>

		<div class="relative">
			<input
				type="number"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder="Quantity"
				bind:value={newRow.quantity} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Quantity *</label>
		</div>

		{#if editMode}
			<div class="flex justify-between">
				<button
					onclick={save}
					class="pressable mr-0.5 w-full cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Save
				</button>

				<button
					onclick={cancel}
					class="pressable ml-0.5 w-full cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
					Cancel
				</button>
			</div>
		{:else}
			<button
				onclick={addRow}
				class="pressable cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
				Add
			</button>
		{/if}
	</div>

	<!-- <div class="target h-[55vh] overflow-y-auto print:h-auto print:overflow-visible"> -->

	<div class="target h-[55vh] overflow-y-auto print:h-auto print:overflow-visible">
		<table class="w-full {editMode ? 'pointer-events-none ' : ''}">
			<thead>
				<tr class="bg-gray-100">
					<th class="p-2 text-left">Article</th>
					<th class="p-2 text-left">Prix</th>
					<th class="p-2 text-left">Quantity</th>
					<th class="p-2 text-left">Total</th>
					<th class="no-print p-2 text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each $achats[selectedCompany] as row}
					<tr class="border-b {oldRow != row && editMode ? ' pointer-events-none blur-xs' : ''} ">
						<td class="p-2">{row.article} </td>
						<td class="p-2">{row.prix}</td>
						<td class="p-2">{row.quantity}</td>
						<td class="p-2">{row.total}</td>
						<td class="no-print p-2">
							<!-- <button on:click={() => deleteRow(row.id)} class="text-red-500 hover:text-red-700">
							Delete
						</button> -->

							<!-- svelte-ignore a11y_consider_explicit_label -->

							<DeleteModal {selectedCompany} ID={row.id} />

							<!-- svelte-ignore a11y_consider_explicit_label -->
							<button
								onclick={() => {
									edit(row);
								}}
								class="pressable mr-1 size-6 cursor-pointer rounded-sm border">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
