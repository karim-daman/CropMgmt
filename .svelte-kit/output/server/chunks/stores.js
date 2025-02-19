import "@tauri-apps/plugin-fs";
import { w as writable } from "./index2.js";
const achats = writable([
  { name: "Cnh", achat: [] },
  { name: "Goweil", achat: [] },
  { name: "General", achat: [] }
]);
const entretiens = writable([
  { name: "Cnh", cards: [] },
  { name: "Goweil", cards: [] }
]);
const clients = writable([]);
const livraisons = writable([]);
const pointages = writable([]);
const history = writable([]);
export {
  achats as a,
  clients as c,
  entretiens as e,
  history as h,
  livraisons as l,
  pointages as p
};
