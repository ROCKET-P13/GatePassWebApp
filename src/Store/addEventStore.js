import dayjs from 'dayjs';
import { create } from 'zustand';
import { EventStatus } from '../Common/eventStatus';
import _ from 'lodash';

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
	closeDialog: () => set({
		isOpen: false,
		eventData: {
			name: '',
			date: dayjs(),
			startTime: dayjs().hour(8).minute(0),
			status: EventStatus.DRAFT,
			participantCapacity: null,
		},
	}),
	clearDialog: () => set({ eventData: null }),
	updateEventData: (data) => {
		set(({ eventData }) => _.assign(eventData, data));
	},
}));