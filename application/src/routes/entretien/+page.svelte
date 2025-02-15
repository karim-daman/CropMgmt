<!-- <script lang="ts">
	import { entretiens, type Card } from '../../lib/stores';

	let selectedCompany = 'Cnh';
	const companies = ['Cnh', 'Goweil'];

	let newCard: Card = {
		id: 0,
		timestamp: '',
		dueDate: '',
		status: 'open',
		description: ''
	};

	function addCard() {
		newCard.id = Date.now();
		newCard.timestamp = new Date().toString();
		$entretiens = [...$entretiens, { ...newCard }];
		newCard = {
			id: 0,
			timestamp: '',
			dueDate: '',
			status: 'open',
			description: ''
		};
	}

	function deleteCard(id: number) {
		$entretiens = $entretiens.filter((card) => card.id !== id);
	}

	function updateStatus(id: number, status: Card['status']) {
		$entretiens = $entretiens.map((card) => (card.id === id ? { ...card, status } : card));
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
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Entretien</h1>

	<div class="mb-4 grid grid-cols-4 gap-4">
		<input type="datetime-local" bind:value={newCard.dueDate} class="rounded border p-2" />
		<select bind:value={newCard.status} class="rounded border p-2">
			<option value="open">Open</option>
			<option value="active">Active</option>
			<option value="done">Done</option>
			<option value="overdue">Overdue</option>
		</select>
		<input
			type="text"
			bind:value={newCard.description}
			placeholder="Description"
			class="rounded border p-2"
		/>
		<button on:click={addCard} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add Card
		</button>
	</div>

	<div class="grid grid-cols-3 gap-4">
		{#each $entretiens as card}
			<div class="rounded-lg p-4 shadow {statusColor(card.status)}">
				<div class="mb-2 flex items-start justify-between">
					<span class="text-sm text-gray-500"> (new Date(card.timestamp), "PPpp") </span>
					<button on:click={() => deleteCard(card.id)} class="text-red-500 hover:text-red-700">
						×
					</button>
				</div>
				<p class="mb-2">{card.description}</p>
				<div class="flex items-center justify-between">
					<span class="text-sm"> Due: (new Date(card.dueDate), "PP") </span>
					<select
						bind:value={card.status}
						on:change={() => updateStatus(card.id, card.status)}
						class="rounded border p-1 text-sm"
					>
						<option value="open">Open</option>
						<option value="active">Active</option>
						<option value="done">Done</option>
						<option value="overdue">Overdue</option>
					</select>
				</div>
			</div>
		{/each}
	</div>
</div> -->

<script lang="ts">
	import { entretiens, type Card } from '../../lib/stores';

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
		newCard.id = Date.now();
		newCard.timestamp = new Date().toString();

		// Add the new card to the selected company's array
		// $entretiens[selectedCompany] = [...$entretiens[selectedCompany], { ...newCard }];

		$entretiens = {
			...$entretiens,
			[selectedCompany]: [...($entretiens[selectedCompany] || []), { ...newCard }]
		};

		// Reset the newCard object
		newCard = {
			id: 0,
			timestamp: '',
			dueDate: '',
			status: 'open',
			description: ''
		};
	}

	function deleteCard(id: number) {
		// Remove the card from the selected company's array
		$entretiens[selectedCompany] = $entretiens[selectedCompany].filter((card) => card.id !== id);
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
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="mb-4 text-2xl font-bold">Entretien</h1>

	<!-- Company Selector -->
	<div class="mb-4">
		<div class=" mb-4 flex space-x-4">
			{#each companies as company}
				<button
					on:click={() => (selectedCompany = company)}
					class="pressable rounded border px-4 py-2"
					class:selected={selectedCompany === company}
				>
					{company}
				</button>
			{/each}
		</div>

		<!-- <label for="company" class="mr-2">Select Company:</label>
		<select bind:value={selectedCompany} id="company" class="rounded border p-2">
			{#each companies as company}
				<option value={company}>{company}</option>
			{/each}
		</select> -->
	</div>

	<!-- Add Card Form -->
	<div class="mb-4 grid grid-cols-4 gap-4">
		<input type="datetime-local" bind:value={newCard.dueDate} class="rounded border p-2" />
		<select bind:value={newCard.status} class="rounded border p-2">
			<option value="open">Open</option>
			<option value="active">Active</option>
			<option value="done">Done</option>
			<option value="overdue">Overdue</option>
		</select>
		<input
			type="text"
			bind:value={newCard.description}
			placeholder="Description"
			class="rounded border p-2"
		/>
		<button on:click={addCard} class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add Card
		</button>
	</div>

	<!-- Display Cards -->
	<div class="grid grid-cols-3 gap-4">
		{#each $entretiens[selectedCompany] as card}
			<div class="rounded-lg p-4 shadow {statusColor(card.status)}">
				<div class="mb-2 flex items-start justify-between">
					<span class="text-sm text-gray-500">
						{new Date(card.timestamp).toLocaleString()}
					</span>
					<button on:click={() => deleteCard(card.id)} class="text-red-500 hover:text-red-700">
						×
					</button>
				</div>
				<p class="mb-2">{card.description}</p>
				<div class="flex items-center justify-between">
					<span class="text-sm">
						Due: {new Date(card.dueDate).toLocaleDateString()}
					</span>
					<select
						bind:value={card.status}
						on:change={() => updateStatus(card.id, card.status)}
						class="rounded border p-1 text-sm"
					>
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
