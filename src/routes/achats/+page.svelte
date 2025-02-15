<script lang="ts">
	import { achats, type AchatRow } from '../../lib/stores';

	let selectedCompany = 'Cnh';
	const companies = ['Cnh', 'Goweil', 'General'];

	let newRow: AchatRow = {
		id: 0,
		article: '',
		prix: 0,
		quantity: 0,
		total: 0
	};

	function addRow() {
		newRow.id = Date.now();
		newRow.total = newRow.prix * newRow.quantity;

		$achats = {
			...$achats,
			[selectedCompany]: [...($achats[selectedCompany] || []), { ...newRow }]
		};

		newRow = { id: 0, article: '', prix: 0, quantity: 0, total: 0 };
	}

	function deleteRow(id: number) {
		$achats = {
			...$achats,
			[selectedCompany]: $achats[selectedCompany].filter((row) => row.id !== id)
		};
	}
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Achats</h1>

	<div class=" mb-4 flex space-x-4">
		{#each companies as company}
			<button
				on:click={() => (selectedCompany = company)}
				class="pressable rounded border px-4 py-2 {selectedCompany === company
					? 'bg-blue-500 text-white'
					: ''} "
				class:selected={selectedCompany === company}
			>
				{company}
			</button>
		{/each}
	</div>

	<div class="mb-4 grid grid-cols-4 gap-4">
		<input
			type="text"
			bind:value={newRow.article}
			placeholder="Article"
			class="rounded border p-2"
		/>
		<input type="number" bind:value={newRow.prix} placeholder="Prix" class="rounded border p-2" />
		<input
			type="number"
			bind:value={newRow.quantity}
			placeholder="Quantity"
			class="rounded border p-2"
		/>
		<button on:click={addRow} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add
		</button>
	</div>

	<table class="w-full">
		<thead>
			<tr class="bg-gray-100">
				<th class="p-2 text-left">Article</th>
				<th class="p-2 text-left">Prix</th>
				<th class="p-2 text-left">Quantity</th>
				<th class="p-2 text-left">Total</th>
				<th class="p-2 text-left">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $achats[selectedCompany] as row}
				<tr class="border-b">
					<td class="p-2">{row.article}</td>
					<td class="p-2">{row.prix}</td>
					<td class="p-2">{row.quantity}</td>
					<td class="p-2">{row.total}</td>
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
