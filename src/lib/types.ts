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
	UnitPrice: number;
	Quantity: number;
	Total: number;
};

export type PointageRow = {
	ID: number;
	name: string;
	startDate: Date;
	missedDays: number;
};

export type Action = {
	date: Date;
	name: string;
	status: string;
	object: AchatRow | ClientRow | Card | LivraisonRow | PointageRow;
	objectOld?: AchatRow | ClientRow | Card | LivraisonRow | PointageRow;
	toggle?: boolean;
};
