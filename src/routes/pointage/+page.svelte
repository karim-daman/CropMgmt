<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { history, pointages } from '../../lib/stores';
	import { type Action, type PointageRow } from '../../lib/types';
	import DeleteModal from './deleteModal.svelte';

	let newRow: PointageRow = {
		ID: Date.now(),
		name: '',
		startDate: new Date(),
		missedDays: 0
	};

	function addRow() {
		if (!newRow.name) {
			toast.error('Please enter the name.', {
				position: 'top-right'
			});
			return;
		}

		$pointages = [...$pointages, { ...newRow }];

		toast.success('Added a new pointage.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'cre|Added a new pointage.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		newRow = {
			ID: Date.now(),
			name: '',
			startDate: new Date(),
			missedDays: 0
		};
	}

	let oldRow: PointageRow;
	let editMode: boolean = false;

	function edit(currentRow: PointageRow) {
		oldRow = currentRow;
		console.log(JSON.stringify(currentRow, null, 2));

		editMode = true;

		newRow.ID = currentRow.ID;
		newRow.name = currentRow.name;
		newRow.missedDays = currentRow.missedDays;
		newRow.startDate = currentRow.startDate;
	}

	function save() {
		if (!newRow.name) {
			toast.error('Please enter the name.', {
				position: 'top-right'
			});
			cancel();
			return;
		}

		$pointages = $pointages.map((row) => (row.ID === oldRow.ID ? newRow : row));
		// $pointages.map((row) => (row.ID === oldRow.ID ? console.log(newRow) : console.log(row)));/// when deleting a row, saving it after should be impossible but it's not. find out why ?

		let newHistoryItem: Action = {
			name: 'upd|Edited a pointage.',
			date: new Date(),
			status:
				'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
			object: { ...newRow },
			objectOld: { ...oldRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		toast.success('Edited a pointage.', {
			position: 'top-right'
		});

		cancel();
	}

	function cancel() {
		newRow = {
			ID: Date.now(),
			name: '',
			startDate: new Date(),
			missedDays: 0
		};
		editMode = false;
	}
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Pointage</h1>

	<div class="mb-4 grid grid-cols-4 gap-4">
		<input type="text" bind:value={newRow.name} placeholder="Name" class="rounded border p-2" />
		<input type="date" bind:value={newRow.startDate} class="rounded border p-2" />
		<input
			type="number"
			bind:value={newRow.missedDays}
			placeholder="Missed Days"
			class="rounded border p-2" />

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
				<th class="p-2 text-left">Start Date</th>
				<th class="p-2 text-left">Missed Days</th>
				<th class="p-2 text-left">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $pointages as row}
				<tr class="border-b">
					<td class="p-2">{row.name}</td>
					<td class="p-2">{new Date(row.startDate).toLocaleDateString()}</td>
					<td class="p-2">{row.missedDays}</td>
					<td class="p-2">
						<DeleteModal ID={row.ID} />

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
