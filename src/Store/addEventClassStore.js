import _ from 'lodash';
import { create } from 'zustand';
import { Gender } from '../Common/Gender';

export const addEventClassStore = create((set) => ({
	isOpen: false,
	eventClass: {
		name: '',
		mininumAge: '',
		maximumAge: '',
		skillLevel: '',
		capacity: '',
		startTime: '',
		gender: Gender.MALE,
	},
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
	clearDialog: () => {
		set({
			eventClass: {
				name: '',
				mininumAge: '',
				maximumAge: '',
				skillLevel: '',
				capacity: '',
				startTime: '',
				gender: Gender.MALE,
			},
		});
	},
	updateEventClassData: (data) => {
		set(({ eventClass }) => _.assign(eventClass, data));
	},
}));