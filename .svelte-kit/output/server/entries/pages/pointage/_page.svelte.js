import { $ as ensure_array_like, _ as store_get, a0 as unsubscribe_stores, V as pop, S as push } from "../../../chunks/index.js";
import { p as pointages } from "../../../chunks/stores.js";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let newRow = {
    name: "",
    startDate: /* @__PURE__ */ new Date(),
    missedDays: 0
  };
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$pointages", pointages));
  $$payload.out += `<div class="rounded-lg bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold">Pointage</h1> <div class="mb-4 grid grid-cols-4 gap-4"><input type="text"${attr("value", newRow.name)} placeholder="Name" class="rounded border p-2"> <input type="date"${attr("value", newRow.startDate)} class="rounded border p-2"> <input type="number"${attr("value", newRow.missedDays)} placeholder="Missed Days" class="rounded border p-2"> <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add</button></div> <table class="w-full"><thead><tr class="bg-gray-100"><th class="p-2 text-left">Name</th><th class="p-2 text-left">Start Date</th><th class="p-2 text-left">Missed Days</th><th class="p-2 text-left">Actions</th></tr></thead><tbody><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let row = each_array[$$index];
    $$payload.out += `<tr class="border-b"><td class="p-2">${escape_html(row.name)}</td><td class="p-2">${escape_html(new Date(row.startDate).toLocaleDateString())}</td><td class="p-2">${escape_html(row.missedDays)}</td><td class="p-2"><button class="text-red-500 hover:text-red-700">Delete</button></td></tr>`;
  }
  $$payload.out += `<!--]--></tbody></table></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
