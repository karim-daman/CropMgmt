<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { entretiens, history } from '../../lib/stores';
	import { type Action, type Card } from '../../lib/types';
	import DeleteModal from './deleteModal.svelte';

	let selectedCompany: 'Cnh' | 'Goweil' = 'Cnh'; // Explicitly type selectedCompany
	const companies = ['Cnh', 'Goweil'];

	let newCard: Card = {
		id: 0,
		timestamp: '',
		dueDate: '',
		status: 'open',
		description: ''
	};

	function addCard() {
		if (!selectedCompany || !newCard.description || !newCard.dueDate) {
			toast.error('Please fill in all required fields (company, description, and due date).', {
				position: 'top-right'
			});
			return;
		}

		newCard.id = Date.now();
		newCard.timestamp = formatDate(new Date());

		$entretiens = {
			...$entretiens,
			[selectedCompany]: [...($entretiens[selectedCompany] || []), { ...newCard }]
		};

		toast.success('Added a new card.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'cre|Added a new entretien.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newCard }
		};

		$history = [...$history, { ...newHistoryItem }];

		// Reset the newCard object
		newCard = {
			id: 0,
			timestamp: '',
			dueDate: '',
			status: 'open',
			description: ''
		};
	}

	function updateStatus(id: number, status: Card['status']) {
		// Update the status of the card in the selected company's array
		$entretiens[selectedCompany] = $entretiens[selectedCompany].map((card) =>
			card.id === id ? { ...card, status } : card
		);
	}

	$: statusColor = (status: Card['status']) => {
		switch (status) {
			case 'open':
				return 'bg-gray-100';
			case 'active':
				return 'bg-blue-100';
			case 'done':
				return 'bg-green-100';
			case 'overdue':
				return 'bg-red-100';
			default:
				return 'bg-gray-100';
		}
	};

	function formatDate(date: Date) {
		const d = new Date(date);

		// Date components
		const day = d.getDate().toString().padStart(2, '0');
		const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
		const year = d.getFullYear();

		// Time components
		let hours = d.getHours();
		const minutes = d.getMinutes().toString().padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';

		// Convert hours to 12-hour format
		hours = hours % 12;
		hours = hours ? hours : 12; // Handle midnight (0 should be 12)
		hours = hours.toString().padStart(2, '0');

		return `${day}/${month}/${year} @ ${hours}:${minutes} ${ampm}`;
	}

	let editMode: boolean = false;

	function edit() {
		editMode = true;

		toast.success('Edited an entretien.', {
			position: 'top-right'
		});

		let newHistoryItem: Action = {
			name: 'upd|Edited a new entretien.',
			date: new Date(),
			status: 'M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
			object: { ...newRow }
		};
	}
</script>

<div class="rounded bg-white p-6 shadow">
	<div class="flex justify-between">
		<h1 class="mb-4 text-2xl font-bold">Entretien</h1>
		<p class="text-xs">(fields that have * are mandatory)</p>
	</div>

	<div class="mb-4">
		<div class=" mb-4 flex space-x-4">
			{#each companies as company}
				<button
					on:click={() => (selectedCompany = company)}
					class="pressable rounded border px-4 py-2 {selectedCompany === company
						? 'bg-blue-500 text-white'
						: ''} "
					class:selected={selectedCompany === company}>
					{company}
				</button>
			{/each}
		</div>
	</div>

	<div class="mb-4 grid grid-cols-4 gap-4">
		<div class="relative">
			<input
				type="datetime-local"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newCard.dueDate} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Due Date *</label>
		</div>

		<div class="relative">
			<select
				bind:value={newCard.status}
				class="peer block w-full rounded border border-gray-300 p-2 px-2.5 pt-4 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500">
				<option value="open">Open</option>
				<option value="active">Active</option>
				<option value="done">Done</option>
				<option value="overdue">Overdue</option>
			</select>

			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Status
			</label>
		</div>

		<div class="relative">
			<input
				type="text"
				id="floating_outlined"
				class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
				placeholder=""
				bind:value={newCard.description} />
			<label
				for="floating_outlined"
				class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
				>Description *</label>
		</div>

		<button
			on:click={addCard}
			class=" pressable rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add
		</button>
	</div>

	<!-- Display Cards -->
	<div class="target grid h-[55vh] grid-cols-3 gap-4 overflow-y-auto">
		{#each $entretiens[selectedCompany] as card}
			<div class="rounded p-4 shadow {statusColor(card.status)}">
				<div class="mb-2 flex items-start justify-between">
					<span class="text-sm text-gray-500">
						{card.timestamp}
					</span>

					<DeleteModal {selectedCompany} ID={card.id} />
				</div>
				<p class="mb-2">{card.description}</p>
				<div class="flex items-center justify-between">
					<span class="text-sm">
						Due: {new Date(card.dueDate).toLocaleDateString()}
					</span>
					<select
						bind:value={card.status}
						on:change={() => updateStatus(card.id, card.status)}
						class="rounded border p-1 text-sm">
						<option value="open">Open</option>
						<option value="active">Active</option>
						<option value="done">Done</option>
						<option value="overdue">Overdue</option>
					</select>
				</div>
			</div>
		{/each}
	</div>
</div>
