import { create } from 'zustand';
import _ from 'lodash';

export const Steps = Object.freeze({
	VENUE: 'VENUE',
	FEATURES: 'FEATURES',
	WAIVER: 'WAIVER',
	EVENT: 'EVENT',
	COMPLETE: 'COMPLETE',
});

export const useOnboardingStore = create((set, get) => ({
	step: Steps.VENUE,
	venue: {
		name: '',
		city: '',
		state: '',
		type: '',
	},
	features: {
		waivers: true,
		events: true,
		checkIn: true,
		payments: true,
	},
	next: () => {
		const steps = _.values(Steps);
		const currentStep = get().step;
		if (Steps[currentStep]) {
			set({ step: steps[_.findIndex(steps, currentStep) + 1] });
		}
	},
	back: () => {
		const steps = _.values(Steps);
		const currentStep = get().step;
		if (Steps[currentStep]) [
			set({ step: steps[_.findIndex(steps, currentStep) - 1] }),
		];
	},
	updateVenue: (data) => {
		set(({ venue }) => ({
			venue: {
				...venue,
				...data,
			},
		}));
	},
	toggleFeature: (key) => {
		set(({ features }) => ({
			features: {
				...features,
				[key]: !state.features[key],
			},
		}));
	},
}));