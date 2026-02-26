import { useMemo } from 'react';
import _ from 'lodash';
import { onboardingStore } from '../../../store/onboardingStore';
import { States } from '../Common/states';

import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';

export const VenueStep = () => {
	const venue = onboardingStore((state) => state.venue);
	const updateVenue = onboardingStore((state) => state.updateVenue);
	const next = onboardingStore((state) => state.next);

	const stringIsValidLength = (value) =>
		value?.length > 2 && value.length < 100;

	const formIsValid = useMemo(() => {
		const validEmailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
		const rules = [
			stringIsValidLength(venue.name),
			validEmailPattern.test(venue.email),
			stringIsValidLength(venue.addressLine1),
			stringIsValidLength(venue.addressLine2),
			stringIsValidLength(venue.city),
			!!States[venue.state],
		];
		return _.every(rules);
	}, [venue]);

	return (
		<div className="space-y-6 max-w-3xl mx-auto">
			<Input
				label="Venue Name"
				value={venue.name}
				placeholder="Venue Name"
				onChange={(e) => updateVenue({ name: e.target.value })}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input
					label="Email"
					type="email"
					value={venue.email}
					placeholder="Contact Email"
					onChange={(e) => updateVenue({ email: e.target.value })}
				/>
				<Input
					label="Phone Number"
					value={venue.phoneNumber}
					placeholder="(555) 123-4567"
					onChange={(e) =>
						updateVenue({
							phoneNumber: e.target.value.replace(/[^\d+()\-\s]/g, ''),
						})
					}
				/>
			</div>

			<div className="space-y-4">
				<Input
					label="Address Line 1"
					value={venue.addressLine1}
					placeholder="123 Main Street"
					onChange={(e) => updateVenue({ addressLine1: e.target.value })}
				/>
				<Input
					label="Address Line 2"
					value={venue.addressLine2}
					placeholder="Unit #30"
					onChange={(e) => updateVenue({ addressLine2: e.target.value })}
				/>

			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input
					label="City"
					value={venue.city}
					placeholder="Jacksonville"
					onChange={(e) => updateVenue({ city: e.target.value })}
				/>
				<Select
					value={States[venue.state]}
					onChange={(state) => updateVenue({ state })}
				>
					<Select.Trigger label="State" placeholder="Choose a state..." />
					<Select.Content maxHeight={48}>
						{
							_.map(States, (name, abbr) => (
								<Select.Item key={abbr} value={abbr}>
									{name}
								</Select.Item>
							))
						}
					</Select.Content>
				</Select>
			</div>

			<div className="mt-6 flex justify-end">
				<Button
					size="md"
					onClick={next}
					disabled={!formIsValid}
				>
					Continue
				</Button>
			</div>
		</div>
	);
};