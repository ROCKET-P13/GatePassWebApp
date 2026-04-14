export type MotoType = 'Heat' | 'LastChanceQualifier' | 'Main';
export type MotoStatus = 'Scheduled' | 'Staging' | 'Racing' | 'Finished';

export interface Moto {
	id: string;
	eventClassId: string;
	motoNumber: number;
	type: MotoType;
	status: MotoStatus;
	startTime?: string;
	createdAt: string;
}