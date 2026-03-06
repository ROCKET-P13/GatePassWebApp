import _ from 'lodash';
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
		set(({ participantData }) => _.assign(participantData, data));
	},
}));