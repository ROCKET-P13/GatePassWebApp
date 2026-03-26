import { create } from 'zustand';

import { EventRegistrationDraft } from '@/types/EventRegistrationDraft';

interface RegisterParticipantState {
	isOpen: boolean;
	registration: EventRegistrationDraft;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	updateRegistrationData: (data: Partial<EventRegistrationDraft>) => void;
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
