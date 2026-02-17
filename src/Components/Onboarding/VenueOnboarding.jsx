import { Box, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { onboardingStore } from '../../store/onboardingStore';
import { Steps } from '../../store/onboardingStore';
import { VenueStep } from './Components.jsx/VenueStep';
import { FeaturesStep } from './Components.jsx/FeaturesStep';
import _ from 'lodash';
import { WaiverStep } from './Components.jsx/WaiverStep';
import { CompleteStep } from './Components.jsx/CompleteStep';

const StepLabels = Object.freeze({
	[Steps.VENUE]: 'Venue',
	[Steps.FEATURES]: 'Features',
	[Steps.WAIVER]: 'Waiver',
	[Steps.COMPLETE]: 'Complete',
});

export const VenueOnboarding = () => {
	const step = onboardingStore((state) => state.step);
	const currentStepIndex = _.chain(Steps).keys().indexOf(step).value();
	return (
		<Box maxWidth={800} mx="auto" mt={6}>
			<Stepper
				activeStep={currentStepIndex}
			>
				{
					_.map(StepLabels, (stepId, stepLabel) => (
						<Step key={stepId}>
							<StepLabel>{stepLabel}</StepLabel>
						</Step>
					))
				}
			</Stepper>

			<Paper sx={{ mt: 4, p: 4 }}>
				{step === Steps.VENUE && <VenueStep />}
				{step === Steps.FEATURES && <FeaturesStep />}
				{step === Steps.WAIVER && <WaiverStep />}
				{step === Steps.COMPLETE && <CompleteStep />}
			</Paper>
		</Box>
	);
};