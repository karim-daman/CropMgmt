<script>
	import { checkForAppUpdates } from '../../lib/updater';

	async function checkForUpdates() {
		await checkForAppUpdates(false);
	}
</script>

<button onclick={checkForUpdates}>check for updates</button>
