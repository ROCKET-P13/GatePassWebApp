import { Button, FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import { onboardingStore } from '../../../store/onboardingStore';
import _ from 'lodash';

const FeatureLabels = Object.freeze({
	WAIVERS: 'Waivers',
	EVENTS: 'Events',
	CHECKIN: 'Check In',
	PAYMENTS: 'Payments',
});

export const FeaturesStep = () => {
	const features = onboardingStore((state) => state.features);
	const toggleFeature = onboardingStore((state) => state.toggleFeature);
	const next = onboardingStore((state) => state.next);
	const back = onboardingStore((state) => state.back);

	return (
		<Stack spacing={3}>
			<FormGroup>
				{
					_.chain(features)
						.entries()
						.map(([key, value]) => (
							<FormControlLabel
								key={key}
								label={FeatureLabels[key.toUpperCase()]}
								control={
									<Switch
										checked={value}
										onChange={() => toggleFeature(key)}
									/>
								}
							/>
						))
						.value()
				}
			</FormGroup>
			<Stack direction='row' spacing={2}>
				<Button variant='outlined' color='secondary' onClick={back}>Back</Button>
				<Button variant='contained' onClick={next}>Continue</Button>
			</Stack>
		</Stack>
	);
};