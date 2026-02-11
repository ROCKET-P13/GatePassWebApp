import dayjs from 'dayjs';
import { create } from 'zustand';

export const EventStatus = Object.freeze({
	ACTIVE: 'ACTIVE',
	PLANNED: 'PLANNED',
});

export const useAddEventStore = create((set, get) => ({
	eventData: {
		name: '',
		date: dayjs(),
		startTime: dayjs().hour(8),
		status: EventStatus.PLANNED,
		participantCapacity: 0,
	},
	updateEventData: (data) => {
		set(({ eventData }) => ({
			eventData: {
				...eventData,
				...data,
			},
		}));
	},
}));