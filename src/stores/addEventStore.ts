import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

import { EventStatus } from '@/Common/EventStatus';

interface EventData {
	name: string;
	date: Dayjs;
	startTime: Dayjs;
	status: string;
	participantCapacity: number | null;
}

interface AddEventState {
	isOpen: boolean;
	eventData: EventData;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	updateEventData: (data: Partial<EventData>) => void;
}

export const addEventStore = create<AddEventState>((set) => ({
	isOpen: false,
	eventData: {
		name: '',
		date: dayjs(),
		startTime: dayjs().hour(8).minute(0),
		status: EventStatus.DRAFT,
		participantCapacity: null,
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			eventData: {
				name: '',
				date: dayjs(),
				startTime: dayjs().hour(8).minute(0),
				status: EventStatus.DRAFT,
				participantCapacity: null,
			},
		});
	},
	updateEventData: (data) => {
		set((state) => ({
			eventData: {
				...state.eventData,
				...data,
			},
		}));
	},
}));
