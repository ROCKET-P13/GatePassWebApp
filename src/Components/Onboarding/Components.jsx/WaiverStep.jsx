import { Stack, Typography } from '@mui/material';
import { onboardingStore } from '../../../store/onboardingStore';
import { useCreateVenueMutation } from '../../../hooks/mutations/useCreateVenueMutation';
import { Button } from '../../ui/Button';

export const WaiverStep = () => {
	const next = onboardingStore((state) => state.next);
	const back = onboardingStore((state) => state.back);
	const venue = onboardingStore((state) => state.venue);

	const createVenue = useCreateVenueMutation({ next });

	return (
		<Stack spacing={3}>
			<Typography>
				Upload your existing waiver or use our default template.
			</Typography>

			<Button variant='outline'>
				Upload PDF
			</Button>

			<div className='flex justify-end gap-4'>
				<Button variant='outline' onClick={back}>Back</Button>
				<Button
					onClick={() => createVenue.mutate({
						name: venue.name,
						email: venue.email,
						addressLine1: venue.addressLine1,
						addressLine2: venue.addressLine2,
						phoneNumber: venue.phoneNumber,
						city: venue.city,
						state: venue.state,
						logoImageUrl: venue.logoImageUrl,
						country: venue.country,
					})}
				>
					{createVenue.isPending ? 'Creating...' : 'Go Live!'}
				</Button>
			</div>
		</Stack>
	);
};