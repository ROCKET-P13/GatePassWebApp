import { Dayjs } from 'dayjs';

export interface Event {
	id: string;
	name: string;
	participantCapacity?: number | null;
	status: string;
	date: string;
	startTime: string;
	startDateTime: Dayjs;
}