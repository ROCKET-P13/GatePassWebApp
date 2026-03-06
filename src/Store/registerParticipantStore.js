import _ from 'lodash';
import { create } from 'zustand';

export const registerParticipantStore = create((set) => ({
	isOpen: false,
	registration: {
		firstName: '',
		lastName: '',
		class: '',
		eventNumber: '',
		checkedIn: false,
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			registration: {
				firstName: '',
				lastName: '',
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