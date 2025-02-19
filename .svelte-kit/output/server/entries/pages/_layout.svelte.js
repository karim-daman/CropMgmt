import { X as current_component, Y as getContext, Z as add_styles, T as push, _ as escape_html, $ as spread_props, W as pop, a0 as spread_attributes, a1 as attr, a2 as merge_styles, a3 as stringify, a4 as store_get, a5 as ensure_array_like, a6 as unsubscribe_stores, a7 as slot } from "../../chunks/index.js";
import "../../chunks/client.js";
import { u as useToasterStore, t as toast, a as update, e as endPause, s as startPause, p as prefersReducedMotion } from "../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "clsx";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height }, false);
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts, pausedAt } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts, handlers };
}
function CheckmarkIcon($$payload, $$props) {
  let { primary = "#61d345", secondary = "#fff" } = $$props;
  $$payload.out += `<div${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })} class="svelte-11kvm4p"></div>`;
}
function ErrorIcon($$payload, $$props) {
  let { primary = "#ff4b4b", secondary = "#fff" } = $$props;
  $$payload.out += `<div${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })} class="svelte-1ee93ns"></div>`;
}
function LoaderIcon($$payload, $$props) {
  let { primary = "#616161", secondary = "#e0e0e0" } = $$props;
  $$payload.out += `<div${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })} class="svelte-1j7dflg"></div>`;
}
function ToastIcon($$payload, $$props) {
  push();
  let { toast: toast2 } = $$props;
  let type = toast2.type;
  let Icon = toast2.icon;
  let iconTheme = toast2.iconTheme;
  if (typeof Icon === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="animated svelte-1kgeier">${escape_html(Icon)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (typeof Icon !== "undefined") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<!---->`;
      Icon($$payload, {});
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      if (type !== "blank") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="indicator svelte-1kgeier">`;
        LoaderIcon($$payload, spread_props([iconTheme]));
        $$payload.out += `<!----> `;
        if (type !== "loading") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="status svelte-1kgeier">`;
          if (type === "error") {
            $$payload.out += "<!--[-->";
            ErrorIcon($$payload, spread_props([iconTheme]));
          } else {
            $$payload.out += "<!--[!-->";
            CheckmarkIcon($$payload, spread_props([iconTheme]));
          }
          $$payload.out += `<!--]--></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ToastMessage($$payload, $$props) {
  push();
  let { toast: toast2 } = $$props;
  let Message = toast2.message;
  $$payload.out += `<div${spread_attributes({ class: "message", ...toast2.ariaProps }, { "svelte-1nauejd": true })}>`;
  if (typeof toast2.message === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(toast2.message)}`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    Message($$payload, spread_props([{ toast: toast2 }, toast2.props]));
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function children$1($$payload, data) {
  ToastIcon($$payload, { toast: data.toast });
  $$payload.out += `<!----> `;
  ToastMessage($$payload, { toast: data.toast });
  $$payload.out += `<!---->`;
}
function ToastBar($$payload, $$props) {
  push();
  let {
    toast: toast2,
    position = void 0,
    Component = void 0
  } = $$props;
  let top = (toast2.position || position || "top-center").includes("top");
  let factor = top ? 1 : -1;
  const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
  let animation = toast2.visible ? enter : exit;
  $$payload.out += `<div${add_styles(merge_styles(toast2.style, { "--factor": factor }))}${attr("class", `base ${stringify(toast2.height ? animation : "transparent")} ${stringify(toast2.className || "")} svelte-1c9srrs`)}>`;
  if (Component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Component($$payload, {
      $$slots: {
        icon: ($$payload2) => {
          ToastIcon($$payload2, { toast: toast2 });
        },
        message: ($$payload2) => {
          ToastMessage($$payload2, { toast: toast2 });
        }
      }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    children$1($$payload, { toast: toast2 });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function children($$payload, data) {
  ToastBar($$payload, {
    toast: data.toast,
    position: data.toast.position
  });
}
function ToastWrapper($$payload, $$props) {
  push();
  let { toast: toast2 } = $$props;
  let top = toast2.position?.includes("top") ? 0 : null;
  let bottom = toast2.position?.includes("bottom") ? 0 : null;
  let factor = toast2.position?.includes("top") ? 1 : -1;
  let justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
  $$payload.out += `<div${add_styles({
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}${attr("class", `wrapper svelte-v01oml ${stringify([
    toast2.visible ? "active" : "",
    !prefersReducedMotion() ? "transition" : ""
  ].filter(Boolean).join(" "))}`)}>`;
  if (toast2.type === "custom") {
    $$payload.out += "<!--[-->";
    ToastMessage($$payload, { toast: toast2 });
  } else {
    $$payload.out += "<!--[!-->";
    children($$payload, { toast: toast2 });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Toaster($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    reverseOrder = false,
    toastOptions,
    position = "top-center",
    gutter = 8,
    containerStyle,
    containerClassName
  } = $$props;
  const { toasts, handlers: handlers2 } = useToaster(toastOptions);
  let _toasts = store_get($$store_subs ??= {}, "$toasts", toasts).map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, store_get($$store_subs ??= {}, "$toasts", toasts), {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  const each_array = ensure_array_like(_toasts);
  $$payload.out += `<div${attr("class", `toaster ${stringify(containerClassName || "")} svelte-1phplh9`)}${attr("style", containerStyle)} role="alert"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let toast2 = each_array[$$index];
    ToastWrapper($$payload, {
      toast: toast2
    });
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Navbar($$payload) {
  $$payload.out += `<nav class="mx-auto mt-2 mb-5 block w-full max-w-screen-lg rounded-md bg-slate-100 px-4 py-2 shadow-md lg:px-8"><div class="container mx-auto flex flex-wrap items-center justify-between text-slate-800"><div><a href="/"${attr("class", `${stringify("")} pressable mr-4 block cursor-pointer rounded-sm p-1 text-base font-semibold text-slate-600 hover:bg-slate-700 hover:text-white`)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg></a></div> <div class="hidden md:block"><ul class="mt-2 mb-4 flex flex-col gap-2 md:mb-0 md:flex-row md:items-center md:gap-6"><li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")} `)}><a href="/achats" class="flex w-22 items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"></path></svg> Achats</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/clients" class="flex w-22 items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Clients</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/entretien" class="flex w-22 items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path></svg> Entretien</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/pointage" class="flex w-22 items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"></path></svg> Pointage</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/livraison" class="flex w-22 items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"></path></svg> Livraison</a></li></ul></div> <button class="relative ml-auto h-10 w-10 rounded-lg text-center align-middle transition-all select-none hover:bg-gray-100 md:hidden" type="button" aria-label="Toggle navigation menu"><span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"><svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></span></button> <div${attr("class", `w-full transition-all duration-300 ease-in-out md:hidden ${stringify("max-h-0  overflow-hidden opacity-0")}`)}><ul class="mt-2 flex flex-col gap-2 rounded-lg bg-gray-50 p-4"><li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")} `)}><a href="/achats" class="flex items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"></path></svg> achats</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/clients" class="flex items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path></svg> clients</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/entretien" class="flex items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"></path></svg> entretien</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/pointage" class="flex items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"></path></svg> pointage</a></li> <li${attr("class", `pressable flex items-center gap-x-2 rounded-sm p-1 text-sm text-slate-600 hover:bg-slate-700 hover:text-white ${stringify("")}`)}><a href="/livraison" class="flex items-center gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"></path></svg> Livraison</a></li></ul></div></div></nav>`;
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  Toaster($$payload, {});
  $$payload.out += `<!----> `;
  if (!store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/livraison/")) {
    $$payload.out += "<!--[-->";
    Navbar($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <main class="mx-auto max-w-7xl px-4 py-6"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
