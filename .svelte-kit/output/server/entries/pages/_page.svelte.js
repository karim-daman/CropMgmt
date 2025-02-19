import { a8 as fallback, a1 as attr, a9 as bind_props, W as pop, T as push, a3 as stringify, a5 as ensure_array_like, a4 as store_get, _ as escape_html, a6 as unsubscribe_stores } from "../../chunks/index.js";
import { h as history } from "../../chunks/stores.js";
import "@tauri-apps/plugin-fs";
import "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
function ClearHistoryModal($$payload, $$props) {
  push();
  let hidden = fallback($$props["hidden"], true);
  $$payload.out += `<button class="pressable cursor-pointer rounded-sm border bg-red-200 px-6 hover:bg-red-500 hover:text-white">Clear All</button> <div id="popup-modal" tabindex="-1"${attr("class", `transit ${stringify(hidden ? "disappear" : " appear")} fixed z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-xs backdrop-brightness-50 md:inset-0`)}><div class="relative max-h-full w-full max-w-md p-4"><div class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700"><button type="button" class="pressable absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"><svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg> <span class="sr-only">Close modal</span></button> <div class="p-4 text-center md:p-5"><svg class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg> <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to clear all history?</h3> <button data-modal-hide="popup-modal" type="button" class="pressable inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-800">Yes, I'm sure</button> <button data-modal-hide="popup-modal" type="button" class="pressable ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">No, cancel</button></div></div></div></div>`;
  bind_props($$props, { hidden });
  pop();
}
function UndoModal($$payload, $$props) {
  push();
  let hidden = fallback($$props["hidden"], true);
  $$payload.out += `<button class="pressable mx-0.5 flex cursor-pointer rounded-sm border px-1 hover:bg-blue-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"></path></svg></button> <div id="popup-modal" tabindex="-1"${attr("class", `transit ${stringify(hidden ? "disappear" : " appear")} fixed z-50 flex h-screen max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto backdrop-blur-xs backdrop-brightness-50 md:inset-0`)}><div class="relative max-h-full w-full max-w-md p-4"><div class="relative rounded-lg bg-white shadow-sm dark:bg-gray-700"><button type="button" class="pressable absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"><svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg> <span class="sr-only">Close modal</span></button> <div class="p-4 text-center md:p-5"><svg class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg> <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to undo history item ?</h3> <button data-modal-hide="popup-modal" type="button" class="pressable inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-800">Yes, I'm sure</button> <button data-modal-hide="popup-modal" type="button" class="pressable ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">No, cancel</button></div></div></div></div>`;
  bind_props($$props, { hidden });
  pop();
}
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let userIcon = "12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z";
  let dollarIcon = "2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z";
  let breifcaseIcon = "11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z";
  let calandarIcon = "6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z";
  let truckIcon = "8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12";
  let stats = [];
  let titles = [
    "achats",
    "clients",
    "entretiens",
    "pointages",
    "livraisons"
  ];
  let icons = [
    dollarIcon,
    userIcon,
    breifcaseIcon,
    calandarIcon,
    truckIcon
  ];
  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, "0");
    return `${day}/${month}/${year} @ ${hours}:${minutes} ${ampm}`;
  }
  const each_array = ensure_array_like({ length: 5 });
  const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$history", history));
  $$payload.out += `<div class="bg-gray-100"><div class="px-4 py-6 sm:px-6 lg:px-8"><header class="mb-8 flex items-center justify-between"><h1 class="text-3xl font-bold text-gray-900 select-none">Dashboard</h1></header> <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    $$payload.out += `<div class="overflow-hidden rounded-lg bg-white shadow"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0 rounded-md bg-indigo-500 p-3"><svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${attr("d", `M ${stringify(icons[i])}`)}></path></svg></div> <div class="ml-5 w-0 flex-1"><dl><dt class="truncate text-sm font-medium text-gray-500 select-none">${escape_html(titles[i])}</dt> <dd class="flex items-baseline">`;
    if (!stats[i]) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="size-8" role="status "><svg aria-hidden="true" class="mt-2 size-4 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg></div>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div class="text-2xl font-semibold text-gray-900 select-none">${escape_html(stats[i]?.value)}</div>`;
    }
    $$payload.out += `<!--]--></dd></dl></div></div></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="mt-11.5 h-[55vh] overflow-hidden rounded-lg bg-white shadow"><div class="p-5"><h2 class="mb-4 text-lg font-medium text-gray-900 select-none">Revenue Overview</h2> <div class="h-64"></div></div></div> <div><div class="mb-4 flex justify-between"><h2 class="text-lg font-medium text-gray-900 select-none"><button type="button" class="relative inline-flex items-center rounded-lg bg-indigo-500 px-5 py-1 text-center text-sm font-medium text-white">History <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">${escape_html(store_get($$store_subs ??= {}, "$history", history).length)}</div></button></h2> <div>`;
  if (store_get($$store_subs ??= {}, "$history", history).length > 0) {
    $$payload.out += "<!--[-->";
    ClearHistoryModal($$payload, {});
    $$payload.out += `<!----> <button class="pressable cursor-pointer rounded-sm border bg-blue-200 px-6 hover:bg-blue-500 hover:text-white">Close All</button>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `empty`;
  }
  $$payload.out += `<!--]--></div></div> <div class="target h-[55vh] overflow-y-auto rounded-lg bg-white shadow svelte-1n6r8d8"><div class="p-5"><ul class="divide-y divide-gray-200"><!--[-->`;
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let item = each_array_1[i];
    $$payload.out += `<li class="transition_all p-1 py-3 duration-200 select-none hover:bg-slate-100"><div class="flex space-x-3 overflow-x-auto"><img class="h-8 w-8 rounded-full" src="https://placehold.co/400x400?text=H" alt="User avatar"> <div class="flex-1 space-y-1"><div class="flex items-center justify-between"><h3 class="text-sm font-medium">Houssam</h3> <p class="text-xs text-gray-500">${escape_html(formatDate(item.date))}</p></div> <div class="flex justify-between text-sm text-gray-500"><div class="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 size-5"><path stroke-linecap="round" stroke-linejoin="round"${attr("d", item.status)}></path></svg> <span${attr("class", ` px-2 ${stringify(item.name.split("|")[0] == "del" ? "del" : item.name.split("|")[0] == "cre" ? "cre" : item.name.split("|")[0] == "upd" ? "upd" : "def")} me-2 rounded-sm border py-0.5 text-xs font-medium svelte-1n6r8d8`)}>${escape_html(item.name.split("|")[1])}</span></div> <div class="flex"><button class="pressable mx-0.5 flex cursor-pointer rounded-sm border px-1 hover:bg-blue-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${attr("class", `size-5 transition-all ${stringify(item.toggle == false ? "" : "rotate-180")} `)}><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path></svg></button> `;
    UndoModal($$payload, {});
    $$payload.out += `<!----> <button class="pressable mx-0.5 flex cursor-pointer rounded-sm border px-1 hover:bg-red-500 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg></button></div></div> <pre${attr("class", ` transition-all duration-200 ${stringify(item.toggle ? "h-auto border" : "h-0 ")} overflow-hidden rounded-sm text-xs`)}>															 ${escape_html(JSON.stringify(item?.objectOld, null, 2))}
															 ${escape_html(JSON.stringify(item.object, null, 2))}
												</pre></div></div></li>`;
  }
  $$payload.out += `<!--]--></ul></div></div></div></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
