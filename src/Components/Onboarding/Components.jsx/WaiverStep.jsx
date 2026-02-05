import { Button, Stack, Typography } from '@mui/material';
import { useOnboardingStore } from '../../../store/useOnboardingStore';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { VenuesAPI } from '../../../API/VenuesAPI';
import { useAuth0 } from '@auth0/auth0-react';

export const WaiverStep = () => {
	const next = useOnboardingStore((state) => state.next);
	const back = useOnboardingStore((state) => state.back);
	const venue = useOnboardingStore((state) => state.venue);

	const { getAccessTokenSilently } = useAuth0();

	const venuesAPI = useMemo(
		() => new VenuesAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const createVenue = useMutation({
		mutationFn: async (venueData) => await venuesAPI.create(venueData),
		onSuccess: (response) => {
			console.log('Venue Created:', response);
			next();
		},
	});

	return (
		<Stack spacing={3}>
			<Typography>
				Upload your existing waiver or use our default template.
			</Typography>

			<Button variant='outlined'>
				Upload PDF
			</Button>

			<Stack direction='row' spacing={2}>
				<Button variant='contained' onClick={back}>Back</Button>
				<Button
					variant='contained'
					onClick={() => createVenue.mutate({
						name: venue.name,
						email: venue.email,
						addressLine1: venue.addressLine1,
						addressLine2: venue.addressLine2,
						phoneNumber: venue.phoneNumber,
						city: venue.city,
						state: venue.state,
					})}
				>
					{createVenue.isPending ? 'Creating...' : 'Go Live!'}
				</Button>
			</Stack>
		</Stack>
	);
};