import { a2 as ensure_array_like, _ as attr, X as escape_html, a0 as stringify, T as pop, Q as push } from "../../chunks/index.js";
import "@tauri-apps/plugin-fs";
function _page($$payload, $$props) {
  push();
  let stats = [];
  let userIcon = "12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z";
  let dollarIcon = "2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z";
  let breifcaseIcon = "11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z";
  let calandarIcon = "6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z";
  let truckIcon = "8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12";
  const activities = [
    {
      user: "John Doe",
      action: "Created a new project",
      time: "2 hours ago"
    },
    {
      user: "Jane Smith",
      action: 'Completed task "Update dashboard"',
      time: "4 hours ago"
    },
    {
      user: "Mike Johnson",
      action: "Added a new team member",
      time: "Yesterday"
    },
    {
      user: "Sarah Williams",
      action: 'Closed project "E-commerce site"',
      time: "2 days ago"
    },
    {
      user: "John Doe",
      action: "Created a new project",
      time: "2 hours ago"
    },
    {
      user: "Jane Smith",
      action: 'Completed task "Update dashboard"',
      time: "4 hours ago"
    },
    {
      user: "Mike Johnson",
      action: "Added a new team member",
      time: "Yesterday"
    },
    {
      user: "Sarah Williams",
      action: 'Closed project "E-commerce site"',
      time: "2 days ago"
    },
    {
      user: "John Doe",
      action: "Created a new project",
      time: "2 hours ago"
    },
    {
      user: "Jane Smith",
      action: 'Completed task "Update dashboard"',
      time: "4 hours ago"
    },
    {
      user: "Mike Johnson",
      action: "Added a new team member",
      time: "Yesterday"
    },
    {
      user: "Sarah Williams",
      action: 'Closed project "E-commerce site"',
      time: "2 days ago"
    },
    {
      user: "John Doe",
      action: "Created a new project",
      time: "2 hours ago"
    },
    {
      user: "Jane Smith",
      action: 'Completed task "Update dashboard"',
      time: "4 hours ago"
    },
    {
      user: "Mike Johnson",
      action: "Added a new team member",
      time: "Yesterday"
    },
    {
      user: "Sarah Williams",
      action: 'Closed project "E-commerce site"',
      time: "2 days ago"
    }
  ];
  const each_array = ensure_array_like(stats);
  const each_array_1 = ensure_array_like(activities);
  $$payload.out += `<div class="min-h-[50%] bg-gray-100"><div class="px-4 py-6 sm:px-6 lg:px-8"><header class="mb-8 flex items-center justify-between"><h1 class="text-3xl font-bold text-gray-900">Dashboard</h1> <div class="flex items-center"><span class="mr-3 text-sm font-medium text-gray-700">HW</span> <img class="h-8 w-8 rounded-full" src="https://placehold.co/400x400?text=H+W" alt="User avatar"></div></header> <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let stat = each_array[$$index];
    $$payload.out += `<div class="overflow-hidden rounded-lg bg-white shadow"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0 rounded-md bg-indigo-500 p-3"><svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", `M ${stringify(stat.icon === "users" ? userIcon : stat.icon === "dollar-sign" ? dollarIcon : stat.icon === "briefcase" ? breifcaseIcon : stat.icon === "calandar" ? calandarIcon : truckIcon)}
`)}></path></svg></div> <div class="ml-5 w-0 flex-1"><dl><dt class="truncate text-sm font-medium text-gray-500">${escape_html(stat.title)}</dt> <dd class="flex items-baseline"><div class="text-2xl font-semibold text-gray-900">${escape_html(stat.value)}</div></dd></dl></div></div></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="overflow-hidden rounded-lg bg-white shadow"><div class="p-5"><h2 class="mb-4 text-lg font-medium text-gray-900">Revenue Overview</h2> <div class="h-64"></div></div></div> <div class="h-96 overflow-y-scroll rounded-lg bg-white shadow"><div class="p-5"><h2 class="mb-4 text-lg font-medium text-gray-900">Recent Activity</h2> <ul class="divide-y divide-gray-200"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let activity = each_array_1[$$index_1];
    $$payload.out += `<li class="py-3"><div class="flex space-x-3"><img class="h-6 w-6 rounded-full" src="https://via.placeholder.com/24" alt=""> <div class="flex-1 space-y-1"><div class="flex items-center justify-between"><h3 class="text-sm font-medium">${escape_html(activity.user)}</h3> <p class="text-sm text-gray-500">${escape_html(activity.time)}</p></div> <p class="text-sm text-gray-500">${escape_html(activity.action)}</p></div></div></li>`;
  }
  $$payload.out += `<!--]--></ul></div></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
