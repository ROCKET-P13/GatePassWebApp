import { Button } from '@ui/Button';
import { Switch } from '@ui/Switch';
import _ from 'lodash';

import { onboardingStore } from '@/Store/onboardingStore';

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
		<div className='gap-4'>
			<div>
				{
					_.chain(features)
						.entries()
						.map(([key, value]) => (
							<Switch
								key={key}
								checked={value}
								onChange={() => toggleFeature(key as keyof typeof features)}
								label={FeatureLabels[key.toUpperCase() as keyof typeof FeatureLabels]}
							/>
						))
						.value()
				}
			</div>

			<div className='flex justify-end gap-4'>
				<Button variant='outline' color='secondary' onClick={back}>Back</Button>
				<Button onClick={next}>Continue</Button>
			</div>
		</div>
	);
};
