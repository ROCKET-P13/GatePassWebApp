import { create } from 'zustand';

interface RegistrationData {
	participantId: string;
	class: string;
	eventNumber: string;
	checkedIn: boolean;
}

interface RegisterParticipantState {
	isOpen: boolean;
	registration: RegistrationData;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	updateRegistrationData: (data: Partial<RegistrationData>) => void;
}

export const registerParticipantStore = create<RegisterParticipantState>((set) => ({
	isOpen: false,
	registration: {
		participantId: '',
		class: '',
		eventNumber: '',
		checkedIn: false,
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			registration: {
				participantId: '',
				class: '',
				eventNumber: '',
				checkedIn: false,
			},
		});
	},
	updateRegistrationData: (data) => {
		set((state) => ({
			registration: {
				...state.registration,
				...data,
			},
		}));
	},
}));
