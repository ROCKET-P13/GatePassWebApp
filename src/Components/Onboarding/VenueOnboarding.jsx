import { Stepper } from '../ui/Stepper';
import { onboardingStore } from '../../store/onboardingStore';
import { Steps } from '../../store/onboardingStore';

import { VenueStep } from './Components.jsx/VenueStep';
import { FeaturesStep } from './Components.jsx/FeaturesStep';
import { WaiverStep } from './Components.jsx/WaiverStep';
import { CompleteStep } from './Components.jsx/CompleteStep';

const stepOrder = [
	Steps.VENUE,
	Steps.FEATURES,
	Steps.WAIVER,
	Steps.COMPLETE,
];

const StepLabels = {
	[Steps.VENUE]: 'Venue',
	[Steps.FEATURES]: 'Features',
	[Steps.WAIVER]: 'Waiver',
	[Steps.COMPLETE]: 'Complete',
};

export const VenueOnboarding = () => {
	const step = onboardingStore((state) => state.step);
	const setStep = onboardingStore((state) => state.setStep);

	const currentStepIndex = stepOrder.indexOf(step);

	return (
		<div className="max-w-3xl mx-auto mt-8 px-4 w-full mb-3">
			<Stepper
				currentStep={currentStepIndex}
				onStepChange={(index) => setStep(stepOrder[index])}
			>
				{stepOrder.map((stepKey) => (
					<Stepper.Step
						key={stepKey}
						title={StepLabels[stepKey]}
					/>
				))}
			</Stepper>

			<div className="mt-8 rounded-xl border bg-card text-card-foreground shadow-sm p-8">
				{step === Steps.VENUE && <VenueStep />}
				{step === Steps.FEATURES && <FeaturesStep />}
				{step === Steps.WAIVER && <WaiverStep />}
				{step === Steps.COMPLETE && <CompleteStep />}
			</div>
		</div>
	);
};