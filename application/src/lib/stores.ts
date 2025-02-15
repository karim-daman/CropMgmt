import { writable } from 'svelte/store';
import {
	readTextFile,
	writeTextFile,
	BaseDirectory,
	exists,
	mkdir,
	create
} from '@tauri-apps/plugin-fs';

// Types
export type AchatRow = {
	id: number;
	article: string;
	prix: number;
	quantity: number;
	total: number;
};

export type ClientRow = {
	id: number;
	name: string;
	pivot: string;
	totalBotte: string;
	datefrom: string;
	dateto: string;
};

export type Card = {
	id: number;
	timestamp: string;
	dueDate: string;
	status: 'open' | 'active' | 'done' | 'overdue';
	description: string;
};

export type LivraisonRow = {
	ID: string;
	Date: Date;
	ClientName: string;
	Cleinttelephone: string;
	chauffeur: {
		ChauffeurName: string;
		ChauffeurTelephone: string;
		ChauffeurPlateNumber: string;
	};
	Source: string;
	Destination: string;
	Article: string;
	UnitPrice: number;
	Quantity: number;
	Total: number;
};

export type PointageRow = {
	name: string;
	startDate: Date;
	missedDays: number;
};

export const achats = writable([
	{ name: 'Cnh', cards: [] as Card[] },
	{ name: 'Goweil', cards: [] as Card[] },
	{ name: 'General', cards: [] as Card[] }
]);

export const entretiens = writable([
	{ name: 'Cnh', cards: [] as Card[] },
	{ name: 'Goweil', cards: [] as Card[] }
]);

export const clients = writable<ClientRow[]>([]);
export const livraisons = writable<LivraisonRow[]>([]);
export const pointages = writable<PointageRow[]>([]);

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

	const files = ['achats.txt', 'clients.txt', 'entretiens.txt', 'livraisons.txt', 'pointages.txt'];
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
		const [achatsData, clientsData, entretiensData, livraisonsData, pointagesData] =
			await Promise.all([
				loadFromFile<AchatRow>('achats'),
				loadFromFile<ClientRow>('clients'),
				loadFromFile<Card>('entretiens'),
				loadFromFile<LivraisonRow>('livraisons'),
				loadFromFile<PointageRow>('pointages')
			]);

		return { achatsData, clientsData, entretiensData, livraisonsData, pointagesData };
	} catch (error) {
		console.error('Error loading stores:', error);
		return {
			achatsData: [],
			clientsData: [],
			entretiensData: [],
			livraisonsData: [],
			pointagesData: []
		};
	}
}

// Initialize stores with data from files
export async function initializeStores() {
	try {
		const { achatsData, clientsData, entretiensData, livraisonsData, pointagesData } =
			await loadStores();

		// Set initial values for stores
		achats.set(achatsData);
		clients.set(clientsData);
		entretiens.set(entretiensData);
		livraisons.set(livraisonsData);
		pointages.set(pointagesData);

		// Set up subscriptions after initial load
		achats.subscribe((data) => saveToFile(data, 'achats'));
		clients.subscribe((data) => saveToFile(data, 'clients'));
		entretiens.subscribe((data) => saveToFile(data, 'entretiens'));
		livraisons.subscribe((data) => saveToFile(data, 'livraisons'));
		pointages.subscribe((data) => saveToFile(data, 'pointages'));
	} catch (error) {
		console.error('Error initializing stores:', error);
	}
}
