import { Dayjs } from 'dayjs';
import _ from 'lodash';
import { create } from 'zustand';

interface EventDraft {
	id?: string;
	name: string;
	date: Dayjs | string;
	startTime: Dayjs | string;
	startDateTime?: Dayjs;
	status: string;
	participantCapacity: number | null;
}

interface EditEventState {
	isOpen: boolean;
	originalEvent: EventDraft;
	eventDraft: EventDraft;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	setEventDraft: (event: EventDraft) => void;
	updateEventDraft: (data: Partial<EventDraft>) => void;
}

export const editEventStore = create<EditEventState>((set) => ({
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
				name: '',
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
		set((state) => ({
			eventDraft: {
				...state.eventDraft,
				...data,
			},
		}));
	},
}));
