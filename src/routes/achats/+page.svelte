<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { achats, history } from '../../lib/stores';
	import { type AchatRow, type Action } from '../../lib/types';
	import DeleteModal from './deleteModal.svelte';

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

		toast.success('cre|Added a new achat.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'Added a new achat.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newRow }
		};

		$history = [...$history, { ...newHistoryItem }];

		newRow = { id: 0, article: '', prix: 0, quantity: 0, total: 0 };
	}

	let editMode: boolean = false;

	function edit() {
		editMode = true;

		toast.success('Edited a achat.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'upd|Edited a achat.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newRow }
		};
	}
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Achats</h1>

	<div class=" mb-4 flex space-x-4">
		{#each companies as company}
			<button
				onclick={() => (selectedCompany = company)}
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
		<button onclick={addRow} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
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
						<!-- <button on:click={() => deleteRow(row.id)} class="text-red-500 hover:text-red-700">
							Delete
						</button> -->

						<!-- svelte-ignore a11y_consider_explicit_label -->

						<DeleteModal {selectedCompany} ID={row.id} />

						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button onclick={edit} class="pressable mr-1 size-6 rounded-sm border">
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
