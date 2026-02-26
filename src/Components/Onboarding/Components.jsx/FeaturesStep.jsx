import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import { onboardingStore } from '../../../store/onboardingStore';
import _ from 'lodash';
import { Button } from '../../ui/Button';

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
			<div className='flex justify-end gap-4'>
				<Button variant='outline' color='secondary' onClick={back}>Back</Button>
				<Button onClick={next}>Continue</Button>
			</div>
		</Stack>
	);
};