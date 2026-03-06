import _ from 'lodash';
import { create } from 'zustand';

export const editEventStore = create((set) => ({
	isOpen: false,
	originalEvent: {
		name: '',
		date: '',
		startTime: '',
		status: '',
		participantCapacity: null,
	},
	eventDraft: {
		name: '',
		date: '',
		startTime: '',
		status: '',
		participantCapacity: null,
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			originalEvent: {
				name: '',
				date: '',
				startTime: '',
				status: '',
				participantCapacity: null,
			},
			eventDraft: {
				date: '',
				startTime: '',
				status: '',
				participantCapacity: null,
			},
		});
	},
	setEventDraft: (event) => {
		set({
			originalEvent: event,
			eventDraft: _.cloneDeep(event),
		});
	},
	updateEventDraft: (data) => {
		set(({ eventDraft }) => _.assign(eventDraft, data));
	},
}));