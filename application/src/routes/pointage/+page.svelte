<script lang="ts">
	import { pointages, type PointageRow } from '../../lib/stores';

	let newRow: PointageRow = {
		name: '',
		startDate: new Date(),
		missedDays: 0
	};

	function addRow() {
		$pointages = [...$pointages, { ...newRow }];
		newRow = {
			name: '',
			startDate: new Date(),
			missedDays: 0
		};
	}

	function deleteRow(name: string) {
		$pointages = $pointages.filter((row) => row.name !== name);
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
			class="rounded border p-2"
		/>
		<button on:click={addRow} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add
		</button>
	</div>

	<table class="w-full">
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
						<button on:click={() => deleteRow(row.name)} class="text-red-500 hover:text-red-700">
							Delete
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
