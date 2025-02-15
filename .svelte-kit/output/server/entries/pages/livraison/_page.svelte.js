import { $ as ensure_array_like, _ as store_get, a0 as unsubscribe_stores, V as pop, S as push } from "../../../chunks/index.js";
import { l as livraisons } from "../../../chunks/stores.js";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
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
    $$payload.out += `<tr class="border-b"><td class="p-2">${escape_html(new Date(row.Date).toLocaleDateString())}</td><td class="p-2">${escape_html(row.ClientName)}</td><td class="p-2">${escape_html(row.chauffeur.ChauffeurName)}</td><td class="p-2">${escape_html(row.Source)}</td><td class="p-2">${escape_html(row.Destination)}</td><td class="p-2">${escape_html(row.Article)}</td><td class="p-2">${escape_html(row.UnitPrice)}</td><td class="p-2">${escape_html(row.Quantity)}</td><td class="p-2">${escape_html(row.Total)}</td><td class="p-2"><button class="text-red-500 hover:text-red-700">Delete</button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
