import { create } from 'zustand';

interface EventToDelete {
	id: string;
	name: string;
}

interface DeleteEventState {
	isOpen: boolean;
	eventToDelete: EventToDelete;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	setEventToDelete: (event: EventToDelete) => void;
}

export const deleteEventStore = create<DeleteEventState>((set) => ({
	isOpen: false,
	eventToDelete: {
		id: '',
		name: '',
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			eventToDelete: {
				id: '',
				name: '',
			},
		});
	},
	setEventToDelete: (event) => {
		set({
			eventToDelete: event,
		});
	},
}));
