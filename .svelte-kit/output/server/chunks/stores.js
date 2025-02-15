import { w as writable } from "./index2.js";
import "@tauri-apps/plugin-fs";
const achats = writable({
  Cnh: [],
  Goweil: [],
  General: []
});
const clients = writable();
const entretiens = writable({
  Cnh: [],
  Goweil: []
});
const livraisons = writable();
const pointages = writable();
export {
  achats as a,
  clients as c,
  entretiens as e,
  livraisons as l,
  pointages as p
};
