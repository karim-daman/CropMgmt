<script lang="ts">
	import { toast } from 'svelte-5-french-toast';
	import { clients } from '../../lib/stores';
	import { type ClientRow } from '../../lib/types';
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
		newRow = {
			id: 0,
			name: '',
			pivot: '',
			totalBotte: '',
			datefrom: '',
			dateto: ''
		};

		toast.success('Added a new client.', {
			position: 'top-right'
		});
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
