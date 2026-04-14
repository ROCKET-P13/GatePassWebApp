import { create } from 'zustand';

import { Moto } from '@/types/Moto';

interface EventMotosStore {
	selectedMoto?: Moto;
	setSelectedMoto: (moto: Moto) => void;
}

export const eventMotosStore = create<EventMotosStore>((set) => ({
	selectedMoto: undefined,
	setSelectedMoto: (moto) => set(() => ({
		selectedMoto: moto,
	})),
}));
