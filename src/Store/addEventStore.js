import dayjs from 'dayjs';
import { create } from 'zustand';
import { EventStatus } from '../Common/eventStatus';

export const addEventStore = create((set) => ({
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