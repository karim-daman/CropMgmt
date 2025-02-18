<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { history, livraisons } from '../../lib/stores';
	import { type Action, type LivraisonRow } from '../../lib/types';
	import DeleteModal from './deleteModal.svelte';
	import LegandInputField from '../../components/legandInputField.svelte';

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
		UnitPrice: 0,
		Quantity: 0,
		Total: 0
	};

	function addRow() {
		if (
			!newRow.ClientName ||
			!newRow.chauffeur.ChauffeurName ||
			!newRow.Source ||
			!newRow.Destination ||
			!newRow.UnitPrice ||
			!newRow.Quantity
		) {
			toast.error('Please fill in all required fields.', {
				position: 'top-right'
			});
			return;
		}

		newRow.ID = Date.now().toString();
		newRow.Total = newRow.UnitPrice * newRow.Quantity;
		$livraisons = [...$livraisons, { ...newRow }];

		toast.success('Added a new bon livraison.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'cre|Added a new livraison.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newRow }
		};

		$history = [...$history, { ...newHistoryItem }];

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
			UnitPrice: 0,
			Quantity: 0,
			Total: 0
		};
	}

	let editMode: boolean = false;
	let oldRow: LivraisonRow;

	function edit(currentRow: LivraisonRow) {
		oldRow = currentRow;
		console.log(JSON.stringify(currentRow, null, 2));

		editMode = true;

		newRow = {
			ID: currentRow.ID,
			Date: currentRow.Date,
			ClientName: currentRow.ClientName,
			Cleinttelephone: currentRow.Cleinttelephone,
			chauffeur: {
				ChauffeurName: currentRow.chauffeur.ChauffeurName,
				ChauffeurTelephone: currentRow.chauffeur.ChauffeurTelephone,
				ChauffeurPlateNumber: currentRow.chauffeur.ChauffeurPlateNumber
			},
			Source: currentRow.Source,
			Destination: currentRow.Destination,
			UnitPrice: currentRow.UnitPrice,
			Quantity: currentRow.Quantity,
			Total: currentRow.Total
		};
	}

	function save() {
		if (
			!newRow.ClientName ||
			!newRow.chauffeur.ChauffeurName ||
			!newRow.Source ||
			!newRow.Destination ||
			!newRow.UnitPrice ||
			!newRow.Quantity
		) {
			toast.error('Please fill in all required fields.', {
				position: 'top-right'
			});
			cancel();
			return;
		}

		newRow.Total = newRow.UnitPrice * newRow.Quantity;

		$livraisons = $livraisons.map((row) => (row.ID === oldRow.ID ? newRow : row));
		// $pointages.map((row) => (row.ID === oldRow.ID ? console.log(newRow) : console.log(row)));/// when deleting a row, saving it after should be impossible but it's not. find out why ?

		let newHistoryItem: Action = {
			name: 'upd|Edited a livraison.',
			date: new Date(),
			status:
				'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10',
			object: { ...newRow },
			objectOld: { ...oldRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		toast.success('Edited a livraison.', {
			position: 'top-right'
		});

		cancel();
	}

	function cancel() {
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
			UnitPrice: 0,
			Quantity: 0,
			Total: 0
		};
		editMode = false;
	}
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<fiv class="flex justify-between">
		<h1 class="mb-4 text-2xl font-bold">Livraison</h1>
		<p class="text-xs">(fields with * are mandatory)</p>
	</fiv>

	<div class="mb-4 grid grid-cols-3 gap-4">
		<div class="space-y-2">
			<input type="datetime-local" bind:value={newRow.Date} class="w-full rounded border p-2" />
			<input
				type="text"
				bind:value={newRow.ClientName}
				placeholder="Client Name *"
				class="w-full rounded border p-2" />
			<input
				type="tel"
				bind:value={newRow.Cleinttelephone}
				placeholder="Client Telephone"
				class="w-full rounded border p-2" />
		</div>

		<div class="space-y-2">
			<input
				type="text"
				bind:value={newRow.chauffeur.ChauffeurName}
				placeholder="Chauffeur Name *"
				class="w-full rounded border p-2" />
			<input
				type="tel"
				bind:value={newRow.chauffeur.ChauffeurTelephone}
				placeholder="Chauffeur Telephone"
				class="w-full rounded border p-2" />
			<input
				type="text"
				bind:value={newRow.chauffeur.ChauffeurPlateNumber}
				placeholder="Plate Number"
				class="w-full rounded border p-2" />
		</div>

		<div class="space-y-2">
			<input
				type="text"
				bind:value={newRow.Source}
				placeholder="Source *"
				class="w-full rounded border p-2" />
			<input
				type="text"
				bind:value={newRow.Destination}
				placeholder="Destination *"
				class="w-full rounded border p-2" />

			<div class="grid grid-cols-2 gap-2">
				<input
					type="number"
					bind:value={newRow.UnitPrice}
					placeholder="Unit Price *"
					class="rounded border p-2" />
				<input
					type="number"
					bind:value={newRow.Quantity}
					placeholder="Quantity *"
					class="rounded border p-2" />
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
					class="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Add
				</button>
			{/if}
		</div>
	</div>

	<table class="w-full {editMode ? 'pointer-events-none ' : ''}">
		<thead>
			<tr class="bg-gray-100">
				<th class="p-2 text-left">Date</th>
				<th class="p-2 text-left">Client</th>
				<th class="p-2 text-left">Chauffeur</th>
				<th class="p-2 text-left">Source</th>
				<th class="p-2 text-left">Destination</th>
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
					<td class="p-2">{row.UnitPrice}</td>
					<td class="p-2">{row.Quantity}</td>
					<td class="p-2">{row.Total}</td>
					<td class="flex p-2">
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<a href="/livraison/{row.ID}" class="pressable mr-1 size-6 rounded-sm border"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class=" ">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
							</svg>
						</a>

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
