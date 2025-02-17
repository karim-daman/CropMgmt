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

// Load stores from files
export async function loadStores() {
	try {
		const [achatsData, clientsData, entretiensData, livraisonsData, pointagesData, historyData] =
			await Promise.all([
				loadFromFile<AchatRow>('achats'),
				loadFromFile<ClientRow>('clients'),
				loadFromFile<Card>('entretiens'),
				loadFromFile<LivraisonRow>('livraisons'),
				loadFromFile<PointageRow>('pointages'),
				loadFromFile<Action>('history')
			]);

		return { achatsData, clientsData, entretiensData, livraisonsData, pointagesData, historyData };
	} catch (error) {
		console.error('Error loading stores:', error);
		return {
			achatsData: [],
			clientsData: [],
			entretiensData: [],
			livraisonsData: [],
			pointagesData: [],
			historyData: []
		};
	}
}

let initialized = false;

// Initialize stores with data from files
export async function initializeStores() {
	if (initialized) return;

	try {
		const { achatsData, clientsData, entretiensData, livraisonsData, pointagesData, historyData } =
			await loadStores();

		// Set initial values for stores
		achats.set(achatsData);
		clients.set(clientsData);
		entretiens.set(entretiensData);
		livraisons.set(livraisonsData);
		pointages.set(pointagesData);
		history.set(historyData);

		// Set up subscriptions after initial load
		achats.subscribe((data) => saveToFile(data, 'achats'));
		clients.subscribe((data) => saveToFile(data, 'clients'));
		entretiens.subscribe((data) => saveToFile(data, 'entretiens'));
		livraisons.subscribe((data) => saveToFile(data, 'livraisons'));
		pointages.subscribe((data) => saveToFile(data, 'pointages'));
		history.subscribe((data) => saveToFile(data, 'history'));
	} catch (error) {
		console.error('Error initializing stores:', error);
	}

	initialized = true;
}
