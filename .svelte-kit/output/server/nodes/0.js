import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.ETiV8DfJ.js","_app/immutable/chunks/DpUOHsiD.js","_app/immutable/chunks/ih3xEocW.js","_app/immutable/chunks/Cu6ud-uC.js","_app/immutable/chunks/sbhvrw2O.js","_app/immutable/chunks/B11ZGyqV.js","_app/immutable/chunks/BYuvHWmW.js"];
export const stylesheets = ["_app/immutable/assets/0.BjCjy6vx.css"];
export const fonts = [];
