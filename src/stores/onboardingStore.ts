import _ from 'lodash';
import { create } from 'zustand';

import { Venue } from '@/types/Venue';

export const Steps = Object.freeze({
	VENUE: 'VENUE',
	FEATURES: 'FEATURES',
	WAIVER: 'WAIVER',
	COMPLETE: 'COMPLETE',
});

type StepType = typeof Steps[keyof typeof Steps];

interface Features {
	waivers: boolean;
	events: boolean;
	checkIn: boolean;
	payments: boolean;
}

interface OnboardingState {
	step: StepType;
	venue: Venue;
	features: Features;
	setStep: (step: StepType) => void;
	next: () => void;
	back: () => void;
	updateVenue: (data: Partial<Venue>) => void;
	toggleFeature: (key: keyof Features) => void;
}

export const onboardingStore = create<OnboardingState>((set, get) => ({
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
	setStep: (step) => {
		set({ step: step });
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
