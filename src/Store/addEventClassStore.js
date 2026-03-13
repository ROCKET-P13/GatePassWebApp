import _ from 'lodash';
import { create } from 'zustand';
import { Gender } from '../Common/Gender';

export const addEventClassStore = create((set) => ({
	isOpen: false,
	eventClass: {
		name: '',
		gender: Gender.MALE,
		skillLevel: '',
		maximumAge: undefined,
		minimumAge: undefined,
		participantCapacity: '',
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			eventClass: {
				name: '',
				gender: Gender.MALE,
				skillLevel: '',
				maximumAge: undefined,
				minimumAge: undefined,
				participantCapacity: '',
			},
		});
	},
	updateEventClassData: (data) => {
		set(({ eventClass }) => _.assign(eventClass, data));
	},
}));