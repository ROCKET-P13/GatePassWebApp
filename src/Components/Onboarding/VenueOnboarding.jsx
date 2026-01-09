import { Box, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { Steps } from '../../store/useOnboardingStore';
import { VenueStep } from './Steps/VenueStep';
import { FeaturesStep } from './Steps/FeaturesStep';
import _ from 'lodash';
import { WaiverStep } from './Steps/WaiverStep';
import { EventStep } from './Steps/EventStep';
import { CompleteStep } from './Steps/CompleteStep';

const StepLabels = Object.freeze({
	[Steps.VENUE]: 'Venue',
	[Steps.FEATURES]: 'Features',
	[Steps.WAIVER]: 'Waiver',
	[Steps.EVENT]: 'First Event',
	[Steps.COMPLETE]: 'Complete',
});

export const VenueOnboarding = () => {
	const step = useOnboardingStore((state) => state.step);
	const currentStepIndex = _.chain(Steps).values().findIndex(step).value();

	return (
		<Box maxWidth={600} mx="auto" mt={6}>
			<Stepper activeStep={currentStepIndex} alternativeLabel>
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
				{step === Steps.EVENT && <EventStep />}
				{step === Steps.COMPLETE && <CompleteStep />}
			</Paper>
		</Box>
	);
};