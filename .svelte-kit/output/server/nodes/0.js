import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.B52t9EAL.js","_app/immutable/chunks/DwQ4lwh6.js","_app/immutable/chunks/C_J4HtAr.js","_app/immutable/chunks/BUcacFcE.js","_app/immutable/chunks/fBF_9RES.js","_app/immutable/chunks/BcWcTcbg.js","_app/immutable/chunks/tVoJ7FNx.js","_app/immutable/chunks/BKgT4Wn9.js","_app/immutable/chunks/BKy9mIs-.js","_app/immutable/chunks/VwgcWoH-.js","_app/immutable/chunks/DP8Qqesn.js","_app/immutable/chunks/BstwTP-J.js"];
export const stylesheets = ["_app/immutable/assets/0.Dfd1tPQe.css","_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
