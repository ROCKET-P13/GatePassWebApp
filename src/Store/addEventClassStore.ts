import { create } from 'zustand';

import { Gender } from '@/Common/Gender';

interface EventClassData {
	name: string;
	gender: string;
	skillLevel: string;
	maximumAge: number | undefined;
	minimumAge: number | undefined;
	participantCapacity: string | number;
}

interface AddEventClassState {
	isOpen: boolean;
	eventClass: EventClassData;
	openDialog: () => void;
	closeDialog: () => void;
	clearDialog: () => void;
	updateEventClassData: (data: Partial<EventClassData>) => void;
}

export const addEventClassStore = create<AddEventClassState>((set) => ({
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
		set((state) => ({
			eventClass: {
				...state.eventClass,
				...data,
			},
		}));
	},
}));
