import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DzBbdJRD.js","_app/immutable/chunks/JfoZ43QX.js","_app/immutable/chunks/Bwm_f7xm.js","_app/immutable/chunks/Cqu7gz3W.js","_app/immutable/chunks/CmQMGd_p.js","_app/immutable/chunks/BYqUywFD.js","_app/immutable/chunks/CYGLSzL3.js","_app/immutable/chunks/B0Z87j36.js","_app/immutable/chunks/j28BqTU0.js","_app/immutable/chunks/DJWsIx7W.js","_app/immutable/chunks/Csk83jlU.js"];
export const stylesheets = ["_app/immutable/assets/0.BKugoBLe.css","_app/immutable/assets/Toaster.DLrpRFSn.css"];
export const fonts = [];
