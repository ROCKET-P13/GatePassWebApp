import { create } from 'zustand';

export const addParticipantStore = create((set) => ({
	isOpen: false,
	participantData: {
		firstName: '',
		lastName: '',
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			participantData: {
				firstName: '',
				lastName: '',
			},
		});
	},
	updateParticipantData: (data) => {
		set((state) => ({
			participantData: {
				...state.participantData,
				...data,
			},
		}));
	},
}));