import { a2 as ensure_array_like, a1 as store_get, _ as attr, X as escape_html, a3 as unsubscribe_stores, T as pop, Q as push, a0 as stringify } from "../../../chunks/index.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { a as achats } from "../../../chunks/stores.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let selectedCompany = "Cnh";
  const companies = ["Cnh", "Goweil", "General"];
  let newRow = {
    article: "",
    prix: 0,
    quantity: 0
  };
  const each_array = ensure_array_like(companies);
  const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$achats", achats)[selectedCompany]);
  $$payload.out += `<div class="rounded-lg bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold">Achats</h1> <div class="mb-4 flex space-x-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let company = each_array[$$index];
    $$payload.out += `<button${attr("class", `pressable rounded border px-4 py-2 ${stringify(selectedCompany === company ? "bg-blue-500 text-white" : "")} ${stringify([selectedCompany === company ? "selected" : ""].filter(Boolean).join(" "))}`)}>${escape_html(company)}</button>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-4 grid grid-cols-4 gap-4"><input type="text"${attr("value", newRow.article)} placeholder="Article" class="rounded border p-2"> <input type="number"${attr("value", newRow.prix)} placeholder="Prix" class="rounded border p-2"> <input type="number"${attr("value", newRow.quantity)} placeholder="Quantity" class="rounded border p-2"> <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add</button></div> <table class="w-full"><thead><tr class="bg-gray-100"><th class="p-2 text-left">Article</th><th class="p-2 text-left">Prix</th><th class="p-2 text-left">Quantity</th><th class="p-2 text-left">Total</th><th class="p-2 text-left">Actions</th></tr></thead><tbody><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let row = each_array_1[$$index_1];
    $$payload.out += `<tr class="border-b"><td class="p-2">${escape_html(row.article)}</td><td class="p-2">${escape_html(row.prix)}</td><td class="p-2">${escape_html(row.quantity)}</td><td class="p-2">${escape_html(row.total)}</td><td class="p-2"><button class="pressable mr-1 size-6 rounded-sm border text-red-500 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg></button> <button class="pressable mr-1 size-6 rounded-sm border"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path></svg></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
