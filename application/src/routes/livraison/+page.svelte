<script lang="ts">
	import { livraisons, type LivraisonRow } from '../../lib/stores';

	let newRow: LivraisonRow = {
		ID: '',
		Date: new Date(),
		ClientName: '',
		Cleinttelephone: '',
		chauffeur: {
			ChauffeurName: '',
			ChauffeurTelephone: '',
			ChauffeurPlateNumber: ''
		},
		Source: '',
		Destination: '',
		Article: '',
		UnitPrice: 0,
		Quantity: 0,
		Total: 0
	};

	function addRow() {
		newRow.ID = Date.now().toString();
		newRow.Total = newRow.UnitPrice * newRow.Quantity;
		$livraisons = [...$livraisons, { ...newRow }];
		newRow = {
			ID: '',
			Date: new Date(),
			ClientName: '',
			Cleinttelephone: '',
			chauffeur: {
				ChauffeurName: '',
				ChauffeurTelephone: '',
				ChauffeurPlateNumber: ''
			},
			Source: '',
			Destination: '',
			Article: '',
			UnitPrice: 0,
			Quantity: 0,
			Total: 0
		};
	}

	function deleteRow(id: string) {
		$livraisons = $livraisons.filter((row) => row.ID !== id);
	}
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Livraison</h1>

	<div class="mb-4 grid grid-cols-3 gap-4">
		<div class="space-y-2">
			<input type="datetime-local" bind:value={newRow.Date} class="w-full rounded border p-2" />
			<input
				type="text"
				bind:value={newRow.ClientName}
				placeholder="Client Name"
				class="w-full rounded border p-2"
			/>
			<input
				type="tel"
				bind:value={newRow.Cleinttelephone}
				placeholder="Client Telephone"
				class="w-full rounded border p-2"
			/>
		</div>

		<div class="space-y-2">
			<input
				type="text"
				bind:value={newRow.chauffeur.ChauffeurName}
				placeholder="Chauffeur Name"
				class="w-full rounded border p-2"
			/>
			<input
				type="tel"
				bind:value={newRow.chauffeur.ChauffeurTelephone}
				placeholder="Chauffeur Telephone"
				class="w-full rounded border p-2"
			/>
			<input
				type="text"
				bind:value={newRow.chauffeur.ChauffeurPlateNumber}
				placeholder="Plate Number"
				class="w-full rounded border p-2"
			/>
		</div>

		<div class="space-y-2">
			<input
				type="text"
				bind:value={newRow.Source}
				placeholder="Source"
				class="w-full rounded border p-2"
			/>
			<input
				type="text"
				bind:value={newRow.Destination}
				placeholder="Destination"
				class="w-full rounded border p-2"
			/>
			<input
				type="text"
				bind:value={newRow.Article}
				placeholder="Article"
				class="w-full rounded border p-2"
			/>
			<div class="grid grid-cols-2 gap-2">
				<input
					type="number"
					bind:value={newRow.UnitPrice}
					placeholder="Unit Price"
					class="rounded border p-2"
				/>
				<input
					type="number"
					bind:value={newRow.Quantity}
					placeholder="Quantity"
					class="rounded border p-2"
				/>
			</div>
			<button
				on:click={addRow}
				class="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>
				Add
			</button>
		</div>
	</div>

	<table class="w-full">
		<thead>
			<tr class="bg-gray-100">
				<th class="p-2 text-left">Date</th>
				<th class="p-2 text-left">Client</th>
				<th class="p-2 text-left">Chauffeur</th>
				<th class="p-2 text-left">Source</th>
				<th class="p-2 text-left">Destination</th>
				<th class="p-2 text-left">Article</th>
				<th class="p-2 text-left">Price</th>
				<th class="p-2 text-left">Qty</th>
				<th class="p-2 text-left">Total</th>
				<th class="p-2 text-left">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $livraisons as row}
				<tr class="border-b">
					<td class="p-2">{new Date(row.Date).toLocaleDateString()}</td>
					<td class="p-2">{row.ClientName}</td>
					<td class="p-2">{row.chauffeur.ChauffeurName}</td>
					<td class="p-2">{row.Source}</td>
					<td class="p-2">{row.Destination}</td>
					<td class="p-2">{row.Article}</td>
					<td class="p-2">{row.UnitPrice}</td>
					<td class="p-2">{row.Quantity}</td>
					<td class="p-2">{row.Total}</td>
					<td class="p-2">
						<button on:click={() => deleteRow(row.ID)} class="text-red-500 hover:text-red-700">
							Delete
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
