import { Y as ensure_array_like, Z as store_get, _ as unsubscribe_stores, S as pop, P as push, T as stringify } from "../../../chunks/index.js";
import { a as achats } from "../../../chunks/stores.js";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
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
    $$payload.out += `<tr class="border-b"><td class="p-2">${escape_html(row.article)}</td><td class="p-2">${escape_html(row.prix)}</td><td class="p-2">${escape_html(row.quantity)}</td><td class="p-2">${escape_html(row.total)}</td><td class="p-2"><button class="text-red-500 hover:text-red-700">Delete</button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
