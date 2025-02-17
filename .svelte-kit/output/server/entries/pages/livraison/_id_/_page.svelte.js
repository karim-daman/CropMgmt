import { Y as escape_html, T as pop, Q as push, a2 as store_get, a4 as unsubscribe_stores } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/index3.js";
import { l as livraisons } from "../../../../chunks/stores.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  function findLivraisonById(id) {
    return store_get($$store_subs ??= {}, "$livraisons", livraisons).find((item) => item.ID === id);
  }
  $$payload.out += `<a class="pressable flex w-16 rounded-sm border px-2" href="/livraison"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"></path></svg> Back</a> <div class="my-8 bg-white p-8"><h1 class="mt-20 mb-32 text-center text-3xl font-bold text-gray-800">Bon De Livraison</h1> <div class="mb-6 grid grid-cols-2 gap-72"><div><p class="font-semibold">Receipt ID: <span class="font-normal">${escape_html(page.params.id)}</span></p> <p class="font-semibold">Date: <span class="font-normal">${escape_html(findLivraisonById(page.params.id)?.Date.toString().split("T")[0])}</span></p></div> <div><p class="font-semibold">Client: <span class="font-normal">${escape_html(findLivraisonById(page.params.id)?.ClientName)}</span></p> <p class="font-semibold">Client Tel: <span class="font-normal">${escape_html(findLivraisonById(page.params.id)?.Cleinttelephone)}</span></p></div></div> <div class="mb-6 grid grid-cols-2 gap-72"><div><p><span class="font-semibold">Chauffeur:</span> ${escape_html(findLivraisonById(page.params.id)?.chauffeur.ChauffeurName)}</p> <p><span class="font-semibold">Chauffeur Tel:</span> ${escape_html(findLivraisonById(page.params.id)?.chauffeur.ChauffeurTelephone)}</p> <p><span class="font-semibold">Chauffeur Mat:</span> ${escape_html(findLivraisonById(page.params.id)?.chauffeur.ChauffeurPlateNumber)}</p></div> <div><p><span class="font-semibold">Source:</span> ${escape_html(findLivraisonById(page.params.id)?.Source)}</p> <p><span class="font-semibold">Destination:</span> ${escape_html(findLivraisonById(page.params.id)?.Destination)}</p></div></div> <table class="mt-32 mb-6 w-full"><thead><tr class="bg-gray-100"><th class="p-2 text-left">Article</th><th class="p-2 text-right">Prix U.</th><th class="p-2 text-right">Quantite</th><th class="p-2 text-right">Total</th></tr></thead><tbody><tr><td class="border-t p-2">Botte Ensilage</td><td class="border-t p-2 text-right">$${escape_html(findLivraisonById(page.params.id)?.UnitPrice.toFixed(2))}</td><td class="border-t p-2 text-right">${escape_html(findLivraisonById(page.params.id)?.Quantity)}</td><td class="border-t p-2 text-right">$${escape_html(findLivraisonById(page.params.id)?.Total.toFixed(2))}</td></tr></tbody></table> <div class="text-right"><p class="rounded-sm border p-2 text-xl font-semibold">Total: $${escape_html(findLivraisonById(page.params.id)?.Total.toFixed(2))}</p></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
