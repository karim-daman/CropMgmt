import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C_G6Q9oc.js","_app/immutable/chunks/DpEC42Oz.js","_app/immutable/chunks/I5jpou1v.js","_app/immutable/chunks/CwavQbNY.js","_app/immutable/chunks/BGrn0sVC.js","_app/immutable/chunks/C0I-sOUY.js","_app/immutable/chunks/iDWTUHhc.js","_app/immutable/chunks/D6smiJYB.js","_app/immutable/chunks/C4lauY-A.js","_app/immutable/chunks/BdoIN8DB.js","_app/immutable/chunks/DRaHeqgg.js"];
export const stylesheets = ["_app/immutable/assets/0.C1NhBFXo.css","_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
