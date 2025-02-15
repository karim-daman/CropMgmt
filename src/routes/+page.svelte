<script lang="ts">
	import { onMount } from 'svelte';
	import {
		achats,
		clients,
		entretiens,
		initializeStores,
		livraisons,
		pointages
	} from '../lib/stores';

	let stats: any = [];

	onMount(async () => {
		await initializeStores();
		stats = [
			{
				title: 'achats',
				value: 0,
				// JSON.stringify($achats?.Cnh.length, null, 2) +
				// JSON.stringify($achats?.Goweil.length, null, 2) +
				// JSON.stringify($achats?.General.length, null, 2),
				icon: 'dollar-sign'
			},
			{
				title: 'clients',
				value: JSON.stringify($clients?.length, null, 2),
				icon: 'users'
			},
			{
				title: 'entretiens',
				value: 0,
				// JSON.stringify($entretiens?.Cnh.length, null, 2) +
				// JSON.stringify($entretiens?.Goweil.length, null, 2),
				icon: 'briefcase'
			},
			{
				title: 'pointages',
				value: JSON.stringify($pointages?.length, null, 2),
				icon: 'percent'
			},
			{
				title: 'livraisons',
				value: JSON.stringify($livraisons?.length, null, 2),
				icon: 'percent'
			}
		];
	});

	const activities = [
		{ user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
		{ user: 'Jane Smith', action: 'Completed task "Update dashboard"', time: '4 hours ago' },
		{ user: 'Mike Johnson', action: 'Added a new team member', time: 'Yesterday' },
		{ user: 'Sarah Williams', action: 'Closed project "E-commerce site"', time: '2 days ago' },
		{ user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
		{ user: 'Jane Smith', action: 'Completed task "Update dashboard"', time: '4 hours ago' },
		{ user: 'Mike Johnson', action: 'Added a new team member', time: 'Yesterday' },
		{ user: 'Sarah Williams', action: 'Closed project "E-commerce site"', time: '2 days ago' },
		{ user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
		{ user: 'Jane Smith', action: 'Completed task "Update dashboard"', time: '4 hours ago' },
		{ user: 'Mike Johnson', action: 'Added a new team member', time: 'Yesterday' },
		{ user: 'Sarah Williams', action: 'Closed project "E-commerce site"', time: '2 days ago' },
		{ user: 'John Doe', action: 'Created a new project', time: '2 hours ago' },
		{ user: 'Jane Smith', action: 'Completed task "Update dashboard"', time: '4 hours ago' },
		{ user: 'Mike Johnson', action: 'Added a new team member', time: 'Yesterday' },
		{ user: 'Sarah Williams', action: 'Closed project "E-commerce site"', time: '2 days ago' }
	];
</script>

<div class="min-h-[50%] bg-gray-100">
	<div class="px-4 py-6 sm:px-6 lg:px-8">
		<header class="mb-8 flex items-center justify-between">
			<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
			<div class="flex items-center">
				<span class="mr-3 text-sm font-medium text-gray-700">HW</span>
				<img
					class="h-8 w-8 rounded-full"
					src="https://placehold.co/400x400?text=H+W"
					alt="User avatar"
				/>
			</div>
		</header>
		<!--  -->

		<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
			{#each stats as stat}
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0 rounded-md bg-indigo-500 p-3">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M{stat.icon === 'users'
											? '12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
											: stat.icon === 'dollar-sign'
												? '12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
												: stat.icon === 'briefcase'
													? '21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
													: '11 15a4 4 0 01-4 4m0 0a4 4 0 01-4-4m4 4v2m0-6V7m6 10a4 4 0 01-4-4m0 0a4 4 0 01-4 4m4-4v2m0-6V7m6 10v2m0-6V7m6 10a4 4 0 01-4-4m0 0a4 4 0 01-4 4'}"
									></path>
								</svg>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="truncate text-sm font-medium text-gray-500">{stat.title}</dt>
									<dd class="flex items-baseline">
										<div class="text-2xl font-semibold text-gray-900">{stat.value}</div>
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div class="overflow-hidden rounded-lg bg-white shadow">
				<div class="p-5">
					<h2 class="mb-4 text-lg font-medium text-gray-900">Revenue Overview</h2>
					<div class="h-64">
						canvas
						<!-- <canvas bind:this={canvas}></canvas> -->
					</div>
				</div>
			</div>
			<div class="h-96 overflow-y-scroll rounded-lg bg-white shadow">
				<div class="p-5">
					<h2 class="mb-4 text-lg font-medium text-gray-900">Recent Activity</h2>
					<ul class="divide-y divide-gray-200">
						{#each activities as activity}
							<li class="py-3">
								<div class="flex space-x-3">
									<img class="h-6 w-6 rounded-full" src="https://via.placeholder.com/24" alt="" />
									<div class="flex-1 space-y-1">
										<div class="flex items-center justify-between">
											<h3 class="text-sm font-medium">{activity.user}</h3>
											<p class="text-sm text-gray-500">{activity.time}</p>
										</div>
										<p class="text-sm text-gray-500">{activity.action}</p>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
