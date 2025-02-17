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

		let tempObj = $clients.find((item) => item.id == newRow.id);

		toast.success('Added a new client.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'Added a new client.',
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
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Clients</h1>

	<div class="mb-4 grid grid-cols-6 gap-4">
		<input type="text" bind:value={newRow.name} placeholder="Name" class="rounded border p-2" />
		<input type="text" bind:value={newRow.pivot} placeholder="Pivot" class="rounded border p-2" />
		<input
			type="text"
			bind:value={newRow.totalBotte}
			placeholder="Total Botte"
			class="rounded border p-2"
		/>
		<input type="date" bind:value={newRow.datefrom} class="rounded border p-2" />
		<input type="date" bind:value={newRow.dateto} class="rounded border p-2" />
		<button on:click={addRow} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add
		</button>
	</div>

	<table class="w-full">
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
						<button class="pressable mr-1 size-6 rounded-sm border">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
								/>
							</svg>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
