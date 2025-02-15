import { Y as ensure_array_like, Z as store_get, T as stringify, _ as unsubscribe_stores, S as pop, P as push } from "../../../chunks/index.js";
import { e as entretiens } from "../../../chunks/stores.js";
import { a as attr } from "../../../chunks/attributes.js";
import { e as escape_html } from "../../../chunks/escaping.js";
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
  $$payload.out += `<div class="rounded-lg bg-white p-6 shadow"><h1 class="mb-4 text-2xl font-bold">Entretien</h1> <div class="mb-4"><div class="mb-4 flex space-x-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let company = each_array[$$index];
    $$payload.out += `<button${attr("class", `pressable rounded border px-4 py-2 ${stringify(selectedCompany === company ? "bg-blue-500 text-white" : "")} ${stringify([selectedCompany === company ? "selected" : ""].filter(Boolean).join(" "))}`)}>${escape_html(company)}</button>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-4 grid grid-cols-4 gap-4"><input type="datetime-local"${attr("value", newCard.dueDate)} class="rounded border p-2"> <select class="rounded border p-2"><option value="open">Open</option><option value="active">Active</option><option value="done">Done</option><option value="overdue">Overdue</option></select> <input type="text"${attr("value", newCard.description)} placeholder="Description" class="rounded border p-2"> <button class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add Card</button></div> <div class="grid grid-cols-3 gap-4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let card = each_array_1[$$index_1];
    $$payload.out += `<div${attr("class", `rounded-lg p-4 shadow ${stringify(statusColor(card.status))}`)}><div class="mb-2 flex items-start justify-between"><span class="text-sm text-gray-500">${escape_html(new Date(card.timestamp).toLocaleString())}</span> <button class="text-red-500 hover:text-red-700">×</button></div> <p class="mb-2">${escape_html(card.description)}</p> <div class="flex items-center justify-between"><span class="text-sm">Due: ${escape_html(new Date(card.dueDate).toLocaleDateString())}</span> <select class="rounded border p-1 text-sm"><option value="open">Open</option><option value="active">Active</option><option value="done">Done</option><option value="overdue">Overdue</option></select></div></div>`;
  }
  $$payload.out += `<!--]--></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
