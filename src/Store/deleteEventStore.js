import { create } from 'zustand';

export const deleteEventStore = create((set, get) => ({
	isOpen: false,
	eventToDelete: {
		id: '',
		name: '',
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => set({ eventToDelete: null }),
	setEventToDelete: (event) => {
		set({
			eventToDelete: event,
		});
	},
}));