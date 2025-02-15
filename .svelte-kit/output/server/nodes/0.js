import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DC2aBVjv.js","_app/immutable/chunks/C2-o_NFQ.js","_app/immutable/chunks/DAxARKWz.js","_app/immutable/chunks/CBx1LQFb.js","_app/immutable/chunks/yICeVlU3.js","_app/immutable/chunks/CWOAwOG9.js","_app/immutable/chunks/BTFpkzQ7.js"];
export const stylesheets = ["_app/immutable/assets/0.BjCjy6vx.css"];
export const fonts = [];
