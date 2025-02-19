<script lang="ts">
	import { toast } from 'svelte-5-french-toast';
	import { clients, history } from '../../lib/stores';
	import { type Action, type ClientRow } from '../../lib/types';
	import DeleteModal from './deleteModal.svelte';

	let newRow: ClientRow = {
		id: 0,
		name: '',
		pivot: '',
		totalBotte: '',
		datefrom: '',
		dateto: ''
	};

	function addRow() {
		if (!newRow.name || !newRow.pivot || !newRow.datefrom) {
			toast.error('Please fill in all required fields (name, pivot, start date.).', {
				position: 'top-right'
			});
			return;
		}

		newRow.id = Date.now();
		$clients = [...$clients, { ...newRow }];

		toast.success('Added a new client.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'cre|Added a new client.',
			date: new Date(),
			status:
				'M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z',
			object: { ...newRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		newRow = {
			id: 0,
			name: '',
			pivot: '',
			totalBotte: '',
			datefrom: '',
			dateto: ''
		};
	}

	let oldRow: ClientRow;
	let editMode: boolean = false;

	function edit(currentRow: ClientRow) {
		oldRow = currentRow;
		console.log(JSON.stringify(currentRow, null, 2));

		editMode = true;

		newRow = {
			id: currentRow.id,
			name: currentRow.name,
			pivot: currentRow.pivot,
			totalBotte: currentRow.totalBotte,
			datefrom: currentRow.datefrom,
			dateto: currentRow.dateto
		};
	}

	function save() {
		if (!newRow.name) {
			toast.error('Please enter the name.', {
				position: 'top-right'
			});
			cancel();
			return;
		}

		$clients = $clients.map((row) => (row.id === oldRow.id ? newRow : row));
		// $pointages.map((row) => (row.ID === oldRow.ID ? console.log(newRow) : console.log(row)));/// when deleting a row, saving it after should be impossible but it's not. find out why ?

		let newHistoryItem: Action = {
			name: 'upd|Edited a client.',
			date: new Date(),
			status:
				'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
			object: { ...newRow },
			objectOld: { ...oldRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		toast.success('Edited a client.', {
			position: 'top-right'
		});

		cancel();
	}

	function cancel() {
		newRow = {
			id: 0,
			name: '',
			pivot: '',
			totalBotte: '',
			datefrom: '',
			dateto: ''
		};
		editMode = false;
	}
</script>

<div class="rounded bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Clients</h1>

	<div class="mb-4 grid grid-cols-6 gap-4">
		<div class="relative">
			<input
				type="text"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newRow.name} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Name *</label>
		</div>
		<div class="relative">
			<input
				type="text"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newRow.pivot} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Pivot *</label>
		</div>
		<div class="relative">
			<input
				type="text"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newRow.totalBotte} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Total Botte
			</label>
		</div>
		<div class="relative">
			<input
				type="date"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newRow.datefrom} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Date from *</label>
		</div>

		<div class="relative">
			<input
				type="date"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newRow.dateto} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Date to *</label>
		</div>

		<!-- <input type="text" bind:value={newRow.name} placeholder="Name" class="rounded border p-2" />
		<input type="text" bind:value={newRow.pivot} placeholder="Pivot" class="rounded border p-2" />
		<input
			type="text"
			bind:value={newRow.totalBotte}
			placeholder="Total Botte"
			class="rounded border p-2" />
		<input type="date" bind:value={newRow.datefrom} class="rounded border p-2" />
		<input type="date" bind:value={newRow.dateto} class="rounded border p-2" /> -->

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

	<table class="w-full {editMode ? 'pointer-events-none ' : ''}">
		<thead>
			<tr class="bg-gray-100">
				<th class="p-2 text-left">Name</th>
				<th class="p-2 text-left">Pivot</th>
				<th class="p-2 text-left">Total Botte</th>
				<th class="p-2 text-left">Date From</th>
				<th class="p-2 text-left">Date To</th>
				<th class="p-2 text-left">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $clients as row}
				<tr class="border-b">
					<td class="p-2">{row.name}</td>
					<td class="p-2">{row.pivot}</td>
					<td class="p-2">{row.totalBotte}</td>
					<td class="p-2">{row.datefrom}</td>
					<td class="p-2">{row.dateto}</td>
					<td class="p-2">
						<!-- svelte-ignore a11y_consider_explicit_label -->

						<DeleteModal ID={row.id} />

						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							onclick={() => {
								edit(row);
							}}
							class="pressable mr-1 size-6 rounded-sm border">
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
