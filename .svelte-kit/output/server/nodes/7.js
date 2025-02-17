import * as server from '../entries/pages/livraison/_id_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/livraison/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/livraison/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.DzS6Y4jE.js","_app/immutable/chunks/DpEC42Oz.js","_app/immutable/chunks/I5jpou1v.js","_app/immutable/chunks/CwavQbNY.js","_app/immutable/chunks/C0I-sOUY.js","_app/immutable/chunks/D1u6o1TT.js","_app/immutable/chunks/iDWTUHhc.js","_app/immutable/chunks/D6smiJYB.js","_app/immutable/chunks/D_iBFdTx.js"];
export const stylesheets = [];
export const fonts = [];
