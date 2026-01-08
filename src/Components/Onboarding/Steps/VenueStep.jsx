import { TextField, Button, Stack, MenuItem, FormControl, Select, InputLabel, Box } from '@mui/material';
import { useOnboardingStore } from '../../../store/useOnboardingStore';
import _ from 'lodash';
import { States } from '../Common/constants';

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
			<Stack direction='row' spacing={2}>
				<TextField
					label='City'
					value={venue.city}
					onChange={(event) => updateVenue({ city: event.target.value })}
					fullWidth
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
			<TextField
				label='Venue Type'
				value={venue.type}
				onChange={(event) => updateVenue({ type: event.target.value })}
				fullWidth
			/>
			<Button
				variant='contained'
				size='large'
				onClick={next}
				disabled={!venue.name}
			>
				Continue
			</Button>
		</Stack>
	);
};