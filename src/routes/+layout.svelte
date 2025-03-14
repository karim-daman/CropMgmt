<!-- 
<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()} 
-->

<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar.svelte';
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-5-french-toast';
	import { onMount } from 'svelte';
	import HardwareVerification from '../components/hardwareVerification.svelte';

	// Preventing right clicking
	onMount(() => {
		const handleContextMenu = (e: any) => {
			e.preventDefault();
		};

		document.addEventListener('contextmenu', handleContextMenu);

		// Clean up event listener when component is destroyed
		return () => {
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	});
</script>

<Toaster />

{#if !$page.url.pathname.startsWith('/livraison/')}
	<Navbar />
{/if}

<!-- <Splash isLoading={!verificationResult?.success} {verificationResult} /> -->

<HardwareVerification />

<main class="mx-auto max-w-7xl px-4 py-6">
	<slot />
</main>
