import { create } from 'zustand';

import { EventClass } from '@/types/EventClass';

interface EventClassStore {
	selectedEventClass: EventClass;
	setSelectedClass: (eventClass: EventClass) => void;
}

export const eventClassStore = create<EventClassStore>((set) => ({
	selectedEventClass: {
		id: '',
		name: '',
	},
	setSelectedClass: (eventClass) => set(() => ({
		selectedEventClass: eventClass,
	})),
}));
