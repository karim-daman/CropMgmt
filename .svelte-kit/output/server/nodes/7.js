import * as server from '../entries/pages/livraison/_id_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/livraison/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/livraison/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.4259-EB5.js","_app/immutable/chunks/DwQ4lwh6.js","_app/immutable/chunks/C_J4HtAr.js","_app/immutable/chunks/BUcacFcE.js","_app/immutable/chunks/B8IoFYXI.js","_app/immutable/chunks/BstwTP-J.js","_app/immutable/chunks/B1arkA9e.js","_app/immutable/chunks/fBF_9RES.js","_app/immutable/chunks/BcWcTcbg.js","_app/immutable/chunks/pzeAkxxs.js"];
export const stylesheets = [];
export const fonts = [];
