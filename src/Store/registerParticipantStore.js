import _ from 'lodash';
import { create } from 'zustand';

export const registerParticipantStore = create((set) => ({
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
		set(({ registration }) => _.assign(registration, data));
	},
}));