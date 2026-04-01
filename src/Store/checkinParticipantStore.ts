import { create } from 'zustand';

import { ParticipantToCheckin } from '@/types/ParticipantToCheckin';

interface CheckinParticipantState {
	isOpen: boolean;
	participant: ParticipantToCheckin;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	setParticipantToCheckin: (participant: ParticipantToCheckin) => void;
}
export const checkinParticipantStore = create<CheckinParticipantState>((set) => ({
	isOpen: false,
	participant: {
		id: '',
		firstName: '',
		lastName: '',
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			participant: {
				id: '',
				firstName: '',
				lastName: '',
			},
		});
	},
	setParticipantToCheckin: (participant) => {
		set({
			participant: participant,
		});
	},
}));