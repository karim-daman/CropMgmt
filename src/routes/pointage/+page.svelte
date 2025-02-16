<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { pointages } from '../../lib/stores';
	import { type PointageRow } from '../../lib/types';
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
		newRow = {
			ID: Date.now(),
			name: '',
			startDate: new Date(),
			missedDays: 0
		};

		toast.success('Added a new pointage.', {
			position: 'top-right'
		});
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
				<th class="p-2 text-left">ID</th>
				<th class="p-2 text-left">Name</th>
				<th class="p-2 text-left">Start Date</th>
				<th class="p-2 text-left">Missed Days</th>
				<th class="p-2 text-left">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $pointages as row}
				<tr class="border-b">
					<td class="p-2">{row.ID}</td>
					<td class="p-2">{row.name}</td>
					<td class="p-2">{new Date(row.startDate).toLocaleDateString()}</td>
					<td class="p-2">{row.missedDays}</td>
					<td class="p-2">
						<DeleteModal ID={row.ID} />

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
