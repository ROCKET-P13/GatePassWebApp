import _ from 'lodash';
import { create } from 'zustand';

export const editEventStore = create((set, get) => ({
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
	clearDialog: () => set({ originalEvent: null, eventDraft: null }),
	setEventDraft: (event) => {
		set({
			originalEvent: event,
			eventDraft: _.cloneDeep(event),
		});
	},
	updateEventDraft: (data) => {
		set(({ eventDraft }) => ({
			eventDraft: {
				...eventDraft,
				...data,
			},
		}));
	},
	hasPendingChanges: () => {
		const { originalEvent, eventDraft } = get();
		return !_.isEqual(originalEvent, eventDraft);
	},
}));