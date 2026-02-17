import dayjs from 'dayjs';
import { create } from 'zustand';
import { EventStatus } from '../Common/eventStatus';

export const addEventStore = create((set, get) => ({
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