<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-5-french-toast';

	let digits: string[] = Array(6).fill('');
	let isVerifying = false;
	let verificationResult: string | null = null;

	function handleInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value;

		// Ensure only one digit is entered
		digits[index] = value.slice(-1);

		// Move focus to the next input if available
		if (value && index < 5) {
			const nextInput = document.getElementById(`digit-${index + 1}`);
			nextInput?.focus();
		}
	}

	function handleKeyDown(index: number, event: KeyboardEvent) {
		if (event.key === 'Backspace' && !digits[index] && index > 0) {
			// Move focus to the previous input on backspace if current input is empty
			const prevInput = document.getElementById(`digit-${index - 1}`);
			prevInput?.focus();
		}
	}

	$: isComplete = digits.every((digit) => digit !== '');

	let intervalId: number;

	let timeRemaining: number = 60;

	// Timer to update the remaining time display
	function startTimeRemainingCounter() {
		const updateTimeRemaining = () => {
			if (timeRemaining > 0) {
				timeRemaining--;
			}
		};

		return window.setInterval(updateTimeRemaining, 1000);
	}

	async function verifyTOTP() {
		isVerifying = true;
		verificationResult = null;
		const password = digits.join('');

		try {
			const response = await fetch('http://localhost:3000/api/verify-totp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': 'test-api-key-123'
				},
				body: JSON.stringify({ password })
			});

			const result = await response.json();

			if (result.valid) {
				verificationResult = 'success';
				toast.success('Verified successfully. \nWelcome back!', {
					position: 'top-right'
				});
			} else {
				verificationResult = 'error';
				toast.error('Wrong password.', {
					position: 'top-right'
				});
			}

			// Update the time remaining
			timeRemaining = result.timeRemaining;
		} catch (error) {
			console.error('Verification error:', error);
			toast.error('Verification failed. Please try again.', {
				position: 'top-right'
			});
		} finally {
			isVerifying = false;
		}
	}

	onMount(() => {
		// Start the countdown timer
		intervalId = startTimeRemainingCounter();

		// Initial verification could be done here if needed
	});

	onDestroy(() => {
		// Clean up the interval when the component is destroyed
		clearInterval(intervalId);
	});
</script>

<div class="flex h-[80vh] items-center justify-center">
	<div class="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-4 text-center text-2xl font-bold text-gray-800">Enter TOTP</h2>
		<form on:submit|preventDefault={verifyTOTP} class="space-y-4">
			<div class="flex justify-between">
				{#each digits as digit, i}
					<input
						type="text"
						id="digit-{i}"
						bind:value={digits[i]}
						on:input={(e) => handleInput(i, e)}
						on:keydown={(e) => handleKeyDown(i, e)}
						class="focus:ring-opacity-50 h-12 w-12 rounded-md border-2 border-gray-300 text-center text-2xl focus:border-blue-500 focus:ring focus:ring-blue-200"
						maxlength="1"
						required />
				{/each}
			</div>
			<button
				type="submit"
				class="pressable focus:ring-opacity-75 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				disabled={!isComplete || isVerifying}>
				{isVerifying ? 'Verifying...' : 'Verify TOTP'}
			</button>
		</form>
		{#if verificationResult}
			<div class="mt-4 text-center" role="alert">
				{#if verificationResult === 'success'}
					<p class="font-semibold text-green-600">TOTP verified successfully!</p>
				{:else}
					<p class="font-semibold text-red-600">Invalid TOTP. Please try again.</p>
				{/if}
			</div>
		{/if}
	</div>
</div>

{timeRemaining}

<!-- {#await getCurrentTOTP()}
	...
{:then data}
	{JSON.stringify(totpData)}
{:catch err}
	{JSON.stringify(err)}
{/await} -->
