import * as server from '../entries/pages/livraison/_id_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/livraison/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/livraison/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.saSD-toG.js","_app/immutable/chunks/JfoZ43QX.js","_app/immutable/chunks/Bwm_f7xm.js","_app/immutable/chunks/Cqu7gz3W.js","_app/immutable/chunks/BYqUywFD.js","_app/immutable/chunks/BW9vsBcZ.js","_app/immutable/chunks/CYGLSzL3.js","_app/immutable/chunks/BcGQwt7o.js"];
export const stylesheets = ["_app/immutable/assets/7.BZyjfrBi.css"];
export const fonts = [];
