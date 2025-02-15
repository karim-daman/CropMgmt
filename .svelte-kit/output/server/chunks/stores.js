import { w as writable } from "./index2.js";
import "@tauri-apps/plugin-fs";
const achats = writable([
  { name: "Cnh", cards: [] },
  { name: "Goweil", cards: [] },
  { name: "General", cards: [] }
]);
const entretiens = writable([
  { name: "Cnh", cards: [] },
  { name: "Goweil", cards: [] }
]);
const clients = writable([]);
const livraisons = writable([]);
const pointages = writable([]);
export {
  achats as a,
  clients as c,
  entretiens as e,
  livraisons as l,
  pointages as p
};
