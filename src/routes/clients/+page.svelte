<script lang="ts">
	import { clients, type ClientRow } from '../../lib/stores';

	let newRow: ClientRow = {
		id: 0,
		name: '',
		pivot: '',
		totalBotte: '',
		datefrom: '',
		dateto: ''
	};

	function addRow() {
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
	}

	function deleteRow(id: number) {
		$clients = $clients.filter((row) => row.id !== id);
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
						<button on:click={() => deleteRow(row.id)} class="text-red-500 hover:text-red-700">
							Delete
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
