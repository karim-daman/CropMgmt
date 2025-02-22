<script lang="ts">
	import { onMount } from 'svelte';
	import { achats } from '../lib/stores';
	import { clients } from '../lib/stores';
	import { entretiens } from '../lib/stores';
	import { initializeAllStores } from '../lib/stores';
	import { livraisons } from '../lib/stores';
	import { pointages } from '../lib/stores';
	import { history } from '../lib/stores';
	import { creditCard, user, wrench, calandar, truck } from '../components/icons';
	import ClearHistoryModal from './clearHistoryModal.svelte';
	import toast from 'svelte-5-french-toast';
	import UndoModal from './undoModal.svelte';

	let stats: any = [];
	let titles: string[] = ['achats', 'clients', 'entretiens', 'pointages', 'livraisons'];
	let icons: any = [creditCard, user, wrench, calandar, truck];

	interface Achats {
		Cnh?: any[];
		Goweil?: any[];
		General?: any[];
	}

	const achat = $achats as Achats;

	interface Entretiens {
		Cnh?: any[];
		Goweil?: any[];
	}

	const entretien = $entretiens as Entretiens;

	let historyArray: any;

	$: historyArray;

	onMount(async () => {
		await initializeAllStores();

		toast.success('Welcome back.', {
			position: 'top-right'
		});

		stats = [
			{
				title: 'achats',
				value:
					(achat?.Cnh?.length || 0) + (achat?.Goweil?.length || 0) + (achat?.General?.length || 0),
				icon: 'dollar-sign'
			},
			{
				title: 'clients',
				value: JSON.stringify($clients?.length, null, 2),
				icon: 'users'
			},
			{
				title: 'entretiens',
				value: (entretien?.Cnh?.length || 0) + (entretien?.Goweil?.length || 0),
				icon: 'briefcase'
			},
			{
				title: 'pointages',
				value: JSON.stringify($pointages?.length, null, 2),
				icon: 'calandar'
			},
			{
				title: 'livraisons',
				value: JSON.stringify($livraisons?.length, null, 2),
				icon: 'truck'
			}
		];

		historyArray = history;
	});

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
		hours = parseInt(hours.toString().padStart(2, '0'), 10);

		return `${day}/${month}/${year} @ ${hours}:${minutes} ${ampm}`;
	}
</script>

<div class=" bg-gray-100">
	<div class=" px-4 py-6 sm:px-6 lg:px-8">
		<header class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-900 select-none">Dashboard</h1>
		</header>

		<div class=" mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
			{#each { length: 5 }, i}
				<div class=" overflow-hidden rounded-lg bg-white shadow">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0 rounded-md bg-indigo-500 p-3">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M {icons[i]}"></path>
								</svg>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="truncate text-sm font-medium text-gray-500 select-none">
										{titles[i]}
									</dt>
									<dd class="flex items-baseline">
										{#if !stats[i]}
											<div class="size-8" role="status ">
												<svg
													aria-hidden="true"
													class=" mt-2 size-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
													viewBox="0 0 100 101"
													fill="none"
													xmlns="http://www.w3.org/2000/svg">
													<path
														d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
														fill="currentColor" />
													<path
														d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
														fill="currentFill" />
												</svg>
											</div>
										{:else}
											<div class="text-2xl font-semibold text-gray-900 select-none">
												{stats[i]?.value}
											</div>
										{/if}
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!--  -->

		<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div class="mt-11.5 h-[55vh] overflow-hidden rounded-lg bg-white shadow">
				<div class="p-5">
					<h2 class="mb-4 text-lg font-medium text-gray-900 select-none">Revenue Overview</h2>
					<div class="h-64"></div>
				</div>
			</div>

			<div class="">
				<div class="mb-4 flex justify-between">
					<h2 class=" text-lg font-medium text-gray-900 select-none">
						<div
							class="relative inline-flex items-center rounded bg-indigo-500 px-5 py-1 text-center text-sm font-medium text-white">
							History
							<div
								class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
								<p class="text-[9px]">{$history.length}</p>
							</div>
						</div>
					</h2>

					<div>
						{#if $history.length > 0}
							<ClearHistoryModal />

							<button
								onclick={() => {
									$history = $history.map((item) => ({ ...item, toggle: false }));
								}}
								class="pressable cursor-pointer rounded-sm border bg-blue-200 px-6 hover:bg-blue-500 hover:text-white"
								>Close All</button>
						{/if}
					</div>
				</div>
				<div class="target h-[55vh] overflow-y-auto rounded-lg bg-white shadow">
					<div class="p-5">
						<ul class="divide-y divide-gray-200">
							{#each $history as item, i}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
								<li class="  transition_all p-1 py-3 duration-200 select-none hover:bg-slate-100">
									<div class="flex space-x-3 overflow-x-auto">
										<img
											class="h-8 w-8 rounded-full"
											src="https://placehold.co/400x400?text=H"
											alt="User avatar" />

										<div class="flex-1 space-y-1">
											<div class="flex items-center justify-between">
												<h3 class="text-sm font-medium">Houssam</h3>
												<p class="text-xs text-gray-500">
													{formatDate(item.date)}
												</p>

												<!-- svelte-ignore a11y_consider_explicit_label -->
											</div>

											<!-- out:fly={{ x: 50, duration: 500 }} -->

											<div class="flex justify-between text-sm text-gray-500">
												<div class="flex">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="mr-2 size-5">
														<path stroke-linecap="round" stroke-linejoin="round" d={item.status} />
													</svg>

													<span
														class=" px-2 {item.name.split('|')[0] == 'del'
															? 'del'
															: item.name.split('|')[0] == 'cre'
																? 'cre'
																: item.name.split('|')[0] == 'upd'
																	? 'upd'
																	: 'def'}  me-2 rounded-sm border py-0.5 text-xs font-medium"
														>{item.name.split('|')[1]}</span>
												</div>

												<div class="flex">
													<!-- svelte-ignore a11y_consider_explicit_label -->
													<button
														onclick={() => {
															item.toggle = !item.toggle;
														}}
														class="pressable mx-0.5 flex cursor-pointer rounded-sm border px-1 hover:bg-blue-500 hover:text-white">
														<!-- view -->

														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="size-5 transition-all {item.toggle == false
																? ''
																: 'rotate-180'} ">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="m19.5 8.25-7.5 7.5-7.5-7.5" />
														</svg>
													</button>

													<UndoModal />
													<!-- svelte-ignore a11y_consider_explicit_label -->
													<button
														onclick={() => {
															$history = $history.filter((h) => h.object !== item.object);
														}}
														class="pressable mx-0.5 flex cursor-pointer rounded-sm border px-1 hover:bg-red-500 hover:text-white">
														<!-- delete -->
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															class="size-5">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M6 18 18 6M6 6l12 12" />
														</svg>
													</button>
												</div>
											</div>
											<pre
												class=" transition-all duration-200 {item.toggle
													? 'h-auto border'
													: 'h-0 '} overflow-hidden rounded-sm text-xs">
															 {JSON.stringify(item?.objectOld, null, 2)}
															 {JSON.stringify(item.object, null, 2)}
												</pre>
										</div>
									</div>
								</li>
							{/each}

							<!--  -->
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import 'tailwindcss';

	.del {
		@apply border-red-400 bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400;
	}

	.upd {
		@apply border-blue-400 bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400;
	}

	.cre {
		@apply border-green-400 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400;
	}

	.def {
		@apply border-gray-500 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400;
	}
</style>
