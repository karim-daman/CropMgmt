import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DE0_PQtF.js","_app/immutable/chunks/CAcwY1Ku.js","_app/immutable/chunks/CmPZlwSp.js","_app/immutable/chunks/BAJsT-C2.js","_app/immutable/chunks/CQRju76c.js","_app/immutable/chunks/QFiES6kV.js","_app/immutable/chunks/C4CSrl9q.js","_app/immutable/chunks/tppimSZz.js","_app/immutable/chunks/DR7RayVE.js","_app/immutable/chunks/DGCoerJH.js","_app/immutable/chunks/DSspGRTc.js"];
export const stylesheets = ["_app/immutable/assets/0.Dn_rWeM8.css","_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
