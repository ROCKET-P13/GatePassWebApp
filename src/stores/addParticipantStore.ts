import { create } from 'zustand';

interface ParticipantData {
	firstName: string;
	lastName: string;
}

interface AddParticipantState {
	isOpen: boolean;
	participantData: ParticipantData;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	updateParticipantData: (data: Partial<ParticipantData>) => void;
}

export const addParticipantStore = create<AddParticipantState>((set) => ({
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
