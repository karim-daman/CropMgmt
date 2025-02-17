import { a6 as fallback, $ as attr, Y as escape_html, a7 as bind_props, T as pop, Q as push, a1 as stringify, a3 as ensure_array_like, a2 as store_get, a4 as unsubscribe_stores } from "../../../chunks/index.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { a as achats } from "../../../chunks/stores.js";
import "@tauri-apps/plugin-fs";
function DeleteModal($$payload, $$props) {
  push();
  let ID = $$props["ID"];
  let selectedCompany = $$props["selectedCompany"];
  let hidden = fallback($$props["hidden"], true);
  $$payload.out += `<button class="pressable mr-1 size-6 rounded-sm border text-red-500 hover:text-red-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg></button> <div id="popup-modal" tabindex="-1"${attr("class", `transit ${stringify(hidden ? "disappear" : " appear")} fixed z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-xs backdrop-brightness-50 md:inset-0`)}><div class="relative max-h-full w-full max-w-md p-4"><div class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700"><button type="button" class="pressable absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"><svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg> <span class="sr-only">Close modal</span></button> <div class="p-4 text-center md:p-5"><svg class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg> <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete achat ID: ${escape_html(ID)}?</h3> <button data-modal-hide="popup-modal" type="button" class="pressable inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-800">Yes, I'm sure</button> <button data-modal-hide="popup-modal" type="button" class="pressable ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">No, cancel</button></div></div></div></div>`;
  bind_props($$props, { ID, selectedCompany, hidden });
  pop();
}
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
    $$payload.out += `<tr class="border-b"><td class="p-2">${escape_html(row.article)}</td><td class="p-2">${escape_html(row.prix)}</td><td class="p-2">${escape_html(row.quantity)}</td><td class="p-2">${escape_html(row.total)}</td><td class="p-2">`;
    DeleteModal($$payload, { selectedCompany, ID: row.id });
    $$payload.out += `<!----> <button class="pressable mr-1 size-6 rounded-sm border"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"></path></svg></button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
