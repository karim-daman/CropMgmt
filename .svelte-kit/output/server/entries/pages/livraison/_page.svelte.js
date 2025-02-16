import { a2 as ensure_array_like, a1 as store_get, _ as attr, X as escape_html, a0 as stringify, a3 as unsubscribe_stores, T as pop, Q as push } from "../../../chunks/index.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { l as livraisons } from "../../../chunks/stores.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let newRow = {
    Date: /* @__PURE__ */ new Date(),
    ClientName: "",
    Cleinttelephone: "",
    chauffeur: {
      ChauffeurName: "",
      ChauffeurTelephone: "",
      ChauffeurPlateNumber: ""
    },
    Source: "",
    Destination: "",
    Article: "",
    UnitPrice: 0,
    Quantity: 0
  };
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$livraisons", livraisons));
  $$payload.out += `<div class="rounded-lg bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold">Livraison</h1> <div class="mb-4 grid grid-cols-3 gap-4"><div class="space-y-2"><input type="datetime-local"${attr("value", newRow.Date)} class="w-full rounded border p-2"> <input type="text"${attr("value", newRow.ClientName)} placeholder="Client Name" class="w-full rounded border p-2"> <input type="tel"${attr("value", newRow.Cleinttelephone)} placeholder="Client Telephone" class="w-full rounded border p-2"></div> <div class="space-y-2"><input type="text"${attr("value", newRow.chauffeur.ChauffeurName)} placeholder="Chauffeur Name" class="w-full rounded border p-2"> <input type="tel"${attr("value", newRow.chauffeur.ChauffeurTelephone)} placeholder="Chauffeur Telephone" class="w-full rounded border p-2"> <input type="text"${attr("value", newRow.chauffeur.ChauffeurPlateNumber)} placeholder="Plate Number" class="w-full rounded border p-2"></div> <div class="space-y-2"><input type="text"${attr("value", newRow.Source)} placeholder="Source" class="w-full rounded border p-2"> <input type="text"${attr("value", newRow.Destination)} placeholder="Destination" class="w-full rounded border p-2"> <input type="text"${attr("value", newRow.Article)} placeholder="Article" class="w-full rounded border p-2"> <div class="grid grid-cols-2 gap-2"><input type="number"${attr("value", newRow.UnitPrice)} placeholder="Unit Price" class="rounded border p-2"> <input type="number"${attr("value", newRow.Quantity)} placeholder="Quantity" class="rounded border p-2"></div> <button class="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add</button></div></div> <table class="w-full"><thead><tr class="bg-gray-100"><th class="p-2 text-left">Date</th><th class="p-2 text-left">Client</th><th class="p-2 text-left">Chauffeur</th><th class="p-2 text-left">Source</th><th class="p-2 text-left">Destination</th><th class="p-2 text-left">Article</th><th class="p-2 text-left">Price</th><th class="p-2 text-left">Qty</th><th class="p-2 text-left">Total</th><th class="p-2 text-left">Actions</th></tr></thead><tbody><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let row = each_array[$$index];
    $$payload.out += `<tr class="border-b"><td class="p-2">${escape_html(new Date(row.Date).toLocaleDateString())}</td><td class="p-2">${escape_html(row.ClientName)}</td><td class="p-2">${escape_html(row.chauffeur.ChauffeurName)}</td><td class="p-2">${escape_html(row.Source)}</td><td class="p-2">${escape_html(row.Destination)}</td><td class="p-2">${escape_html(row.Article)}</td><td class="p-2">${escape_html(row.UnitPrice)}</td><td class="p-2">${escape_html(row.Quantity)}</td><td class="p-2">${escape_html(row.Total)}</td><td class="flex p-2"><a${attr("href", `/livraison/${stringify(row.ID)}`)} class="pressable mr-1 size-6 rounded-sm border"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg></a> <button class="pressable mr-1 size-6 rounded-sm border text-red-500 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg></button> <button class="pressable mr-1 size-6 rounded-sm border"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path></svg></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
