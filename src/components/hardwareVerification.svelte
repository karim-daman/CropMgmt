<script lang="ts">
	import toast from 'svelte-5-french-toast';
	import { initializeLicenseStore, license } from '$lib/stores';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/core';
	import { listen } from '@tauri-apps/api/event';
	import Contact from './contact.svelte';
	import { copy } from './icons';

	let serverOnline = false;
	let verificationResult = null;
	let isLoading = false;
	let isOverlayVisible = true;

	onMount(async () => {
		isOverlayVisible = false;
		await initializeLicenseStore();
		await verifyFingerprint($license.licenseKey);

		// await generateRequest();
		// await verifyFingerprint($license.licenseKey);
	});

	async function checkServer() {
		try {
			const response = await fetch('http://localhost:3000/');

			if (response.ok) {
				toast.success('Server is running');
				serverOnline = true;
			} else {
				toast.error('Server is not running');
				serverOnline = false;
			}
		} catch (error) {
			toast.error('Could not connect to server');
			serverOnline = false;
			console.error('Connection error:', error);
		}
	}

	async function submitRequest(jsonData: any): Promise<any> {
		try {
			const response = await fetch(`http://localhost:3000/request`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(jsonData)
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Failed to submit request: ${errorData.error || response.statusText}`);
			}

			// toast.success('Request submitted successfully: ' + (await response.json()).message, {
			// 	position: 'top-right'
			// });

			return await response.json();
		} catch (error) {
			console.error('Error submitting request:', error);
			toast.error('Failed to submit request', {
				position: 'top-right'
			});
			throw error;
		}
	}

	let status: string;

	async function checkStatus(requestId: string) {
		if (!requestId) {
			toast.error('No request ID available, Please generate a request.', {
				position: 'top-right'
			});
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/checkrequest/${requestId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				if (response.status === 404) {
					toast.error('Request not found', {
						position: 'top-right'
					});
					ClearLicense();
					generateRequest();
				}
				throw new Error(`Error checking request status: ${response.status}`);
			}

			const data = await response.json();

			console.log(data.status);
			console.log(data);

			if (data.status == 'approved') {
				toast.success('Request approved', {
					position: 'top-right'
				});

				$license.licenseKey = data.hash;
				await verifyFingerprint($license.licenseKey);
			} else {
				toast.error('Request has not been processed.', {
					position: 'top-right'
				});
				toast.success('Request found.', {
					position: 'top-right'
				});
			}

			console.log($license);

			status = data.status;
		} catch (error) {
			console.log(error);

			console.error('Failed to check request status:', error);
			toast.error('Failed to check request status.', {
				position: 'top-right'
			});
		}
	}

	function ClearLicense() {
		status = '';
		license.set({});
	}

	async function verifyLicense() {
		await verifyFingerprint($license.licenseKey);
	}

	async function verifyFingerprint(providedHash: string) {
		isLoading = true;
		verificationResult = null;

		if ($license.licenseKey == undefined || $license.licenseKey == '') {
			toast.error('License key not available, Please generate a request.', {
				position: 'top-right'
			});
			isOverlayVisible = true;
			await checkServer();
			return;
		}

		try {
			// Invoke the verification command and await the result
			const result = await invoke('verify_hardware_fingerprint', { providedHash });

			// Handle the result
			verificationResult = result;
			console.log('Verification Result:', verificationResult);
			if (verificationResult === 'Hardware verification successful.') {
				// toast.success('Verification Result: ' + verificationResult, {
				// 	position: 'top-right'
				// });
				isOverlayVisible = false;
			} else {
				isOverlayVisible = true;
				await checkServer();
			}
		} catch (error) {
			console.error('Verification failed:', error);
			isOverlayVisible = true;
			verificationResult = 'Hardware fingerprint failed.';
		} finally {
			isLoading = false;
		}
	}

	// Combined object for status classes
	const statusClasses = {
		pending: {
			container:
				'bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-400 border-orange-500',
			dot: 'bg-orange-500'
		},
		approved: {
			container:
				'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-400 border-green-500',
			dot: 'bg-green-500'
		},
		rejected: {
			container: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-400 border-red-500',
			dot: 'bg-red-500'
		}
	};

	const defaultClasses = {
		container: 'bg-gray-200 text-black',
		dot: 'bg-gray-400'
	};

	$: classes = status ? statusClasses[status] : defaultClasses;

	function toggleOverlay() {
		isOverlayVisible = !isOverlayVisible;
	}

	async function generateRequest() {
		if ($license.requestId == undefined) {
			try {
				const rawFingerprint: any = await invoke('generate_hardware_fingerprint');
				console.log(rawFingerprint);
				let submitResponse = await submitRequest(rawFingerprint);
				toast.success('Request submitted successfully: ' + submitResponse.message, {
					position: 'top-right'
				});
				license.set({ licenseKey: 'null', requestId: submitResponse.requestId });
				await checkStatus($license.requestId);
			} catch (error) {
				console.error('Error requesting license key:', error);
				toast.error('Failed to request license key', {
					position: 'top-right'
				});
			}
		} else {
			toast.success('Request already generated, check status.', {
				position: 'top-right'
			});
			await checkStatus($license.requestId);
			console.log('License object defined: ', $license);
		}
	}
</script>

<!-- Button to trigger the overlay -->
<!-- <button
	class="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
	on:click={toggleOverlay}>
	Show Overlay
</button> -->

<!-- Overlay Component -->
{#if isOverlayVisible}
	<div
		class="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-brightness-50">
		<div class="rounded-lg bg-white p-6 text-center shadow-lg">
			<div class="mb-4 flex justify-between text-xl font-bold">
				<h2>Request license key</h2>
			</div>

			<div
				class="mb-4 flex justify-between rounded-sm border border-gray-200 p-2 text-xl font-bold">
				<div class="text-lg">Status</div>

				<span
					class={`inline-flex items-center rounded-sm border border-gray-200 px-2.5 py-0.5 text-xs font-medium ${classes.container}`}>
					<div class={`mr-2 h-2 w-2 rounded-full border ${classes.dot}`}></div>
					{status || 'Status'}

					{#if status === 'approved'}
						<svg
							class="me-2 ml-2 h-4 w-4 shrink-0 text-green-500 dark:text-green-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20">
							<path
								d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
						</svg>
					{/if}
				</span>
			</div>

			{#if $license.requestId}
				<button
					on:click={ClearLicense}
					class="pressable my-1 cursor-pointer rounded-sm border border-gray-200 px-2">
					ClearLicense
				</button>

				<button
					on:click={() => {
						checkStatus($license.requestId);
					}}
					class="pressable my-1 cursor-pointer rounded-sm border border-gray-200 px-2">
					CheckStatus
				</button>
			{/if}

			{#if serverOnline}
				<button
					on:click={generateRequest}
					class="pressable mb-2 ml-2 cursor-pointer rounded-sm border border-gray-200 px-2">
					GenerateRequest
				</button>
			{:else}
				<div class="my-4 flex justify-between rounded-sm border border-gray-300 p-1">
					<div class=" text-lg">Server</div>
					<div class=" rounded-sm border border-gray-300">
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<svg
							on:click={checkServer}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="pressable size-6 cursor-pointer active:rotate-180">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
						</svg>
					</div>
				</div>
			{/if}

			<div class="mb-4 flex justify-between rounded-sm border border-gray-200 p-2">
				<div class="rounded-sm border border-gray-300 px-1">
					{$license.requestId}
				</div>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class=" {$license.requestId
						? 'pressable'
						: 'cursor-not-allowed'} ml-2 size-6 rounded-sm border border-gray-200 p-0.5">
					<path stroke-linecap="round" stroke-linejoin="round" d={copy} />
				</svg>
			</div>

			{#if status === 'approved'}
				<button
					on:click={verifyLicense}
					type="button"
					class="pressable me-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					{#if isLoading}
						<svg
							aria-hidden="true"
							role="status"
							class="me-3 inline h-4 w-4 animate-spin text-white"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB" />
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor" />
						</svg>
						Verifying...
					{:else}
						Verify Fingerprint
					{/if}
				</button>
			{/if}

			<!-- <button
				on:click={toggleOverlay}
				class="pressable me-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
				>Close</button> -->

			<!-- <div class="flex gap-1">
				<button
					class="rounded-sm bg-red-500 px-4 text-white hover:bg-red-600"
					on:click={toggleOverlay}>
					Close
				</button>
				<Contact />
			</div> -->
		</div>
	</div>
{/if}
