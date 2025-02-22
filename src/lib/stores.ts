import { writable } from 'svelte/store';
import { debounce } from 'lodash';
import { readTextFile, writeTextFile, BaseDirectory, exists, mkdir } from '@tauri-apps/plugin-fs';
import type { AchatRow, Action, Card, ClientRow, LivraisonRow, PointageRow } from './types';

export const achats = writable([
	{ name: 'Cnh', achat: [] as AchatRow[] },
	{ name: 'Goweil', achat: [] as AchatRow[] },
	{ name: 'General', achat: [] as AchatRow[] }
]);
export const entretiens = writable([
	{ name: 'Cnh', cards: [] as Card[] },
	{ name: 'Goweil', cards: [] as Card[] }
]);
export const clients = writable<ClientRow[]>([]);
export const livraisons = writable<LivraisonRow[]>([]);
export const pointages = writable<PointageRow[]>([]);
export const history = writable<Action[]>([]);

async function ensureDataFolder() {
	const dataFolderExist = await exists('data', { baseDir: BaseDirectory.Desktop });

	if (!dataFolderExist) {
		console.log('Data folder does not exist, creating one..');
		await mkdir('data', { baseDir: BaseDirectory.Desktop });
	}

	const files = [
		'achats.txt',
		'clients.txt',
		'entretiens.txt',
		'livraisons.txt',
		'pointages.txt',
		'history.txt'
	];

	await Promise.all(
		files.map(async (file) => {
			const filePath = `data/${file}`;
			if (!(await exists(filePath, { baseDir: BaseDirectory.Desktop }))) {
				await writeTextFile(filePath, '[]', { baseDir: BaseDirectory.Desktop });
			}
		})
	);
}

async function saveToFile(data: any, filename: string) {
	if (!data) return;
	try {
		await writeTextFile(`data/${filename}.txt`, JSON.stringify(data, null, 2), {
			baseDir: BaseDirectory.Desktop
		});
	} catch (error) {
		console.error(`Error saving ${filename}:`, error);
	}
}

async function loadFromFile<T>(filename: string): Promise<T[]> {
	try {
		const content = await readTextFile(`data/${filename}.txt`, { baseDir: BaseDirectory.Desktop });
		return JSON.parse(content) as T[];
	} catch (error) {
		console.error(`Error loading ${filename}:`, error);
		return [];
	}
}

function debounceSave<T>(filename: string) {
	return debounce(async (data: T[]) => {
		await saveToFile(data, filename);
	}, 500);
}

async function initializeStore<T>(store: any, filename: string, setter: (data: T[]) => void) {
	try {
		const data = await loadFromFile<T>(filename);
		setter(data);
		const debouncedSave = debounceSave<T>(filename);
		store.subscribe(debouncedSave);
	} catch (error) {
		console.error(`Error initializing ${filename} store:`, error);
	}
}

let initialized = false;

export async function initializeAllStores() {
	if (initialized) return;
	try {
		await ensureDataFolder(); // Only call once
		await Promise.all([
			initializeAchatsStore(),
			initializeClientsStore(),
			initializeEntretiensStore(),
			initializeLivraisonsStore(),
			initializePointagesStore(),
			initializeHistoryStore()
		]);
	} catch (error) {
		console.error('Error initializing stores:', error);
	}
	initialized = true;
}

export async function initializeAchatsStore() {
	await initializeStore(achats, 'achats', achats.set);
}
export async function initializeClientsStore() {
	await initializeStore(clients, 'clients', clients.set);
}
export async function initializeEntretiensStore() {
	await initializeStore(entretiens, 'entretiens', entretiens.set);
}
export async function initializeLivraisonsStore() {
	await initializeStore(livraisons, 'livraisons', livraisons.set);
}
export async function initializePointagesStore() {
	await initializeStore(pointages, 'pointages', pointages.set);
}
export async function initializeHistoryStore() {
	await initializeStore(history, 'history', history.set);
}
