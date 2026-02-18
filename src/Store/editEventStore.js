import { create } from 'zustand';

export const editEventStore = create((set) => ({
	isOpen: false,
	event: {
		name: '',
		date: '',
		startTime: '',
		status: '',
		participantCapacity: null,
	},
	openDialog: (event) => set({ isOpen: true, event }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => set({ event: null }),
	updateField: (data) => {
		set(({ event }) => ({
			event: {
				...event,
				...data,
			},
		}));
	},
}));