import dayjs from 'dayjs';
import { create } from 'zustand';

export const EventStatus = Object.freeze({
	DRAFT: 'Draft',
	SCHEDULED: 'Scheduled',
	OPEN: 'Open',
	CLOSED: 'Closed',
	COMPLETED: 'Completed',
	CANCELLED: 'Cancelled',
});

export const useAddEventStore = create((set, get) => ({
	eventData: {
		name: '',
		date: dayjs(),
		startTime: dayjs().hour(8).minute(0),
		status: EventStatus.DRAFT,
		participantCapacity: null,
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