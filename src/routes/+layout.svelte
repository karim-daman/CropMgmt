<!--

<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()} 

-->
<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-5-french-toast';
	import Navbar from '../components/navbar.svelte';
</script>

<Toaster />

{#if !$page.url.pathname.startsWith('/livraison/')}
	<Navbar />
{/if}

<main class="mx-auto max-w-7xl px-4 py-6">
	<slot />
</main>
