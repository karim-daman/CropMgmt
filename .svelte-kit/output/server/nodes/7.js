import * as server from '../entries/pages/livraison/_id_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/livraison/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/livraison/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.Bsndn0F1.js","_app/immutable/chunks/CAcwY1Ku.js","_app/immutable/chunks/CmPZlwSp.js","_app/immutable/chunks/BAJsT-C2.js","_app/immutable/chunks/QFiES6kV.js","_app/immutable/chunks/DNmJCmkQ.js","_app/immutable/chunks/C4CSrl9q.js","_app/immutable/chunks/tppimSZz.js","_app/immutable/chunks/CagLcrLm.js"];
export const stylesheets = ["_app/immutable/assets/7.BZyjfrBi.css"];
export const fonts = [];
