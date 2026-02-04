import { TextField, Button, Stack, MenuItem, FormControl, Select, InputLabel, Box } from '@mui/material';
import { useOnboardingStore } from '../../../store/useOnboardingStore';
import { States } from '../Common/states';
import _ from 'lodash';

export const VenueStep = () => {
	const venue = useOnboardingStore((state) => state.venue);
	const updateVenue = useOnboardingStore((state) => state.updateVenue);
	const next = useOnboardingStore((state) => state.next);

	return (
		<Stack spacing={3}>
			<TextField
				label='Venue Name'
				value={venue.name}
				onChange={(event) => updateVenue({ name: event.target.value })}
				fullWidth
			/>
			<TextField
				label='Email'
				value={venue.email}
				onChange={(event) => updateVenue({ email: event.target.value })}
				fullWidth
				placeholder='Contact Email'
			/>
			<Stack direction="column" spacing={3}>
				<TextField
					label="Address Line 1"
					value={venue.addressLine1}
					onChange={(event) => updateVenue({ addressLine1: event.target.value })}
					fullWidth
					placeholder="123 Main Street"
				/>
				<TextField
					label="Address Line 2"
					value={venue.addressLine2}
					onChange={(event) => updateVenue({ addressLine2: event.target.value })}
					fullWidth
					placeholder="Unit #30"
				/>
				<TextField
					label="Phone Number"
					value={venue.phoneNumber}
					onChange={(event) => updateVenue({ phoneNumber: event.target.value.replace(/[^\d+()\-\s]/g, '') })}
					sx={{ maxWidth: 200 }}
					slotProps={{
						htmlInput: {
							inputMode: 'tel',
							maxLength: 20,
						},
					}}
					placeholder="(555) 123-4567"
				/>
			</Stack>

			<Stack direction='row' spacing={2}>
				<TextField
					label='City'
					value={venue.city}
					onChange={(event) => updateVenue({ city: event.target.value })}
					fullWidth
					placeholder="Jacksonville"
				/>
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth>
						<InputLabel id='venue-state-label'>State</InputLabel>
						<Select
							labelId='venue-state-label'
							id='venue-state'
							label='State'
							value={venue.state}
							onChange={(event) => updateVenue({ state: event.target.value })}
						>
							{
								_.chain(States)
									.keys()
									.map((stateAbbreviation) => (
										<MenuItem key={stateAbbreviation} value={stateAbbreviation}>
											{States[stateAbbreviation]}
										</MenuItem>
									))
									.value()
							}
						</Select>
					</FormControl>
				</Box>
			</Stack>
			<Button
				variant='contained'
				size='large'
				onClick={next}
				disabled={!venue.isValid()}
			>
				Continue
			</Button>
		</Stack>
	);
};