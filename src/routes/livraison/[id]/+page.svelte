<script lang="ts">
	import { page } from '$app/state';
	import { livraisons } from '../../../lib/stores';

	type TableRow = {
		ID: string;
		Date: Date;
		ClientName: string;
		Cleinttelephone: string;
		chauffeur: {
			ChauffeurName: string;
			ChauffeurTelephone: string;
			ChauffeurPlateNumber: string;
		};
		Source: string;
		Destination: string;
		Article: string;
		UnitPrice: number;
		Quantity: number;
		Total: number;
	};

	function findLivraisonById(id: string) {
		return ($livraisons as TableRow[]).find((item) => item.ID === id);
	}
</script>

<a class="pressable flex w-16 rounded-sm border px-2" href="/livraison">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class=" mt-1 size-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
		/>
	</svg>

	Back
</a>

<div class="my-8 bg-white p-8">
	<h1 class="mb-32 text-center text-3xl font-bold text-gray-800">Bon De Livraison</h1>

	<div class="mb-6 grid grid-cols-2 gap-72">
		<div>
			<p class="font-semibold">Receipt ID: <span class="font-normal">{page.params.id}</span></p>
			<p class="font-semibold">
				Date: <span class="font-normal"
					>{findLivraisonById(page.params.id)?.Date.toString().split('T')[0]}</span
				>
			</p>
		</div>
		<div>
			<p class="font-semibold">
				Client: <span class="font-normal">{findLivraisonById(page.params.id)?.ClientName}</span>
			</p>
			<p class="font-semibold">
				Client Tel: <span class="font-normal"
					>{findLivraisonById(page.params.id)?.Cleinttelephone}</span
				>
			</p>
		</div>
	</div>

	<div class="mb-6 grid grid-cols-2 gap-72">
		<div class="">
			<p>
				<span class="font-semibold">Chauffeur:</span>
				{findLivraisonById(page.params.id)?.chauffeur.ChauffeurName}
			</p>
			<p>
				<span class="font-semibold">Chauffeur Tel:</span>
				{findLivraisonById(page.params.id)?.chauffeur.ChauffeurTelephone}
			</p>
			<p>
				<span class="font-semibold">Chauffeur Mat:</span>
				{findLivraisonById(page.params.id)?.chauffeur.ChauffeurPlateNumber}
			</p>
		</div>
		<div class="">
			<p><span class="font-semibold">Source:</span> {findLivraisonById(page.params.id)?.Source}</p>
			<p>
				<span class="font-semibold">Destination:</span>
				{findLivraisonById(page.params.id)?.Destination}
			</p>
		</div>
	</div>

	<table class="mt-32 mb-6 w-full">
		<thead>
			<tr class="bg-gray-100">
				<th class="p-2 text-left">Article</th>
				<th class="p-2 text-right">Prix U.</th>
				<th class="p-2 text-right">Quantite</th>
				<th class="p-2 text-right">Total</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="border-t p-2">{findLivraisonById(page.params.id)?.Article}</td>
				<td class="border-t p-2 text-right"
					>${findLivraisonById(page.params.id)?.UnitPrice.toFixed(2)}</td
				>
				<td class="border-t p-2 text-right">{findLivraisonById(page.params.id)?.Quantity}</td>
				<td class="border-t p-2 text-right"
					>${findLivraisonById(page.params.id)?.Total.toFixed(2)}</td
				>
			</tr>
		</tbody>
	</table>

	<div class="text-right">
		<p class="rounded-sm border p-2 text-xl font-semibold">
			Total: ${findLivraisonById(page.params.id)?.Total.toFixed(2)}
		</p>
	</div>
</div>
