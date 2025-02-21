import {
	readTextFile,
	writeTextFile,
	BaseDirectory,
	exists,
	mkdir,
	create
} from '@tauri-apps/plugin-fs';
import { writable } from 'svelte/store';
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
	const dataFolderExist = await exists('data', {
		baseDir: BaseDirectory.Desktop
	});

	if (!dataFolderExist) {
		console.log('Data folder does not exist, creating one..');
		await mkdir('data', {
			baseDir: BaseDirectory.Desktop
		});
	}

	const files = [
		'achats.txt',
		'clients.txt',
		'entretiens.txt',
		'livraisons.txt',
		'pointages.txt',
		'history.txt'
	];

	for (const element of files) {
		const filePath = `data\\${element}`;
		const fileExists = await exists(filePath, {
			baseDir: BaseDirectory.Desktop
		});

		if (!fileExists) {
			const file = await create(filePath, { baseDir: BaseDirectory.Desktop });
			await writeTextFile(filePath, '[]', { baseDir: BaseDirectory.Desktop });
			await file.close();
		}
	}
}

// Save data to file
async function saveToFile(data: any, filename: string) {
	await ensureDataFolder();

	if (!data) return; // Don't save if data is undefined
	try {
		await writeTextFile(`data\\${filename}.txt`, JSON.stringify(data, null, 2), {
			baseDir: BaseDirectory.Desktop
		});
	} catch (error) {
		console.error(`Error saving ${filename}:`, error);
	}
}

// Load data from file
async function loadFromFile<T>(filename: string): Promise<T[]> {
	await ensureDataFolder();
	console.log('Loading data from file ..');
	try {
		const content = await readTextFile(`data\\${filename}.txt`, {
			baseDir: BaseDirectory.Desktop
		});
		return JSON.parse(content) as T[];
	} catch (error) {
		console.error(`Error loading ${filename}:`, error);
		return [];
	}
}

let initialized = false;

// Initialize a single store with data from a file
async function initializeStore<T>(store: any, filename: string, setter: (data: T[]) => void) {
	try {
		const data = await loadFromFile<T>(filename);
		setter(data);
		store.subscribe((data: T[]) => saveToFile(data, filename));
	} catch (error) {
		console.error(`Error initializing ${filename} store:`, error);
	}
}

// Individual store initialization functions
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

// Initialize all stores (optional, if you still need a global initialization)
export async function initializeAllStores() {
	if (initialized) return;

	try {
		await initializeAchatsStore();
		await initializeClientsStore();
		await initializeEntretiensStore();
		await initializeLivraisonsStore();
		await initializePointagesStore();
		await initializeHistoryStore();
	} catch (error) {
		console.error('Error initializing stores:', error);
	}
	initialized = true;
}
