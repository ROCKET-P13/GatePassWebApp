import { create } from 'zustand';
import _ from 'lodash';

export const Steps = Object.freeze({
	VENUE: 'VENUE',
	FEATURES: 'FEATURES',
	WAIVER: 'WAIVER',
	COMPLETE: 'COMPLETE',
});

export const useOnboardingStore = create((set, get) => ({
	step: Steps.VENUE,
	venue: {
		name: '',
		phoneNumber: '',
		addressLine1: '',
		addressLine2: '',
		city: '',
		state: '',
		email: '',
		country: 'US',
		logoImageUrl: '',
	},
	features: {
		waivers: false,
		events: false,
		checkIn: false,
		payments: false,
	},
	next: () => {
		const steps = _.values(Steps);
		const currentStep = get().step;
		const nextStepIndex = _.findIndex(steps, (step) => step === currentStep) + 1;

		if (steps[nextStepIndex]) {
			set({ step: steps[nextStepIndex] });
		}
	},
	back: () => {
		const steps = _.values(Steps);
		const currentStep = get().step;
		const previousStepIndex = _.findIndex(steps, (step) => step === currentStep) - 1;
		if (steps[previousStepIndex]) {
			set({ step: steps[previousStepIndex] });
		}
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
				[key]: !features[key],
			},
		}));
	},
}));