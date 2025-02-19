import { a8 as fallback, a1 as attr, _ as escape_html, a9 as bind_props, W as pop, T as push, a3 as stringify, a5 as ensure_array_like, a4 as store_get, a6 as unsubscribe_stores } from "../../../chunks/index.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { e as entretiens } from "../../../chunks/stores.js";
import "@tauri-apps/plugin-fs";
function DeleteModal($$payload, $$props) {
  push();
  let ID = $$props["ID"];
  let selectedCompany = $$props["selectedCompany"];
  let hidden = fallback($$props["hidden"], true);
  $$payload.out += `<button class="pressable mx-0.5 flex cursor-pointer rounded-sm border px-1 hover:bg-red-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></button> <div id="popup-modal" tabindex="-1"${attr("class", `transit ${stringify(hidden ? "disappear" : " appear")} fixed z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-xs backdrop-brightness-50 md:inset-0`)}><div class="relative max-h-full w-full max-w-md p-4"><div class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700"><button type="button" class="pressable absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"><svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg> <span class="sr-only">Close modal</span></button> <div class="p-4 text-center md:p-5"><svg class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg> <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete card ID: ${escape_html(ID)}?</h3> <button data-modal-hide="popup-modal" type="button" class="pressable inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-800">Yes, I'm sure</button> <button data-modal-hide="popup-modal" type="button" class="pressable ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">No, cancel</button></div></div></div></div>`;
  bind_props($$props, { ID, selectedCompany, hidden });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let statusColor;
  let selectedCompany = "Cnh";
  const companies = ["Cnh", "Goweil"];
  let newCard = {
    dueDate: "",
    description: ""
  };
  statusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-gray-100";
      case "active":
        return "bg-blue-100";
      case "done":
        return "bg-green-100";
      case "overdue":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };
  const each_array = ensure_array_like(companies);
  const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$entretiens", entretiens)[selectedCompany]);
  $$payload.out += `<div class="rounded bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold">Entretien</h1> <div class="mb-4"><div class="mb-4 flex space-x-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let company = each_array[$$index];
    $$payload.out += `<button${attr("class", `pressable rounded border px-4 py-2 ${stringify(selectedCompany === company ? "bg-blue-500 text-white" : "")} ${stringify([selectedCompany === company ? "selected" : ""].filter(Boolean).join(" "))}`)}>${escape_html(company)}</button>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-4 grid grid-cols-4 gap-4"><input type="datetime-local"${attr("value", newCard.dueDate)} class="rounded border border-gray-300 p-2 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"> <select class="rounded border border-gray-300 p-2 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500"><option value="open">Open</option><option value="active">Active</option><option value="done">Done</option><option value="overdue">Overdue</option></select> <div class="relative"><input type="text" id="floating_outlined" class="peer block w-full appearance-none rounded border-1 border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-none dark:border-gray-600 dark:text-white dark:focus:border-blue-500" placeholder=""${attr("value", newCard.description)}> <label for="floating_outlined" class="pointer-events-none absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500">Description *</label></div> <button class="pressable rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add</button></div> <div class="grid grid-cols-3 gap-4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let card = each_array_1[$$index_1];
    $$payload.out += `<div${attr("class", `rounded p-4 shadow ${stringify(statusColor(card.status))}`)}><div class="mb-2 flex items-start justify-between"><span class="text-sm text-gray-500">${escape_html(card.timestamp)}</span> `;
    DeleteModal($$payload, { selectedCompany, ID: card.id });
    $$payload.out += `<!----></div> <p class="mb-2">${escape_html(card.description)}</p> <div class="flex items-center justify-between"><span class="text-sm">Due: ${escape_html(new Date(card.dueDate).toLocaleDateString())}</span> <select class="rounded border p-1 text-sm"><option value="open">Open</option><option value="active">Active</option><option value="done">Done</option><option value="overdue">Overdue</option></select></div></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
