<!-- <script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()} -->

<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Navbar from './components/navbar.svelte';
</script>

<Navbar />

<!-- {$page.url.pathname} -->

<main class="mx-auto max-w-7xl px-4 py-6">
	<slot />
</main>
