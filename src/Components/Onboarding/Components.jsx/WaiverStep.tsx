import { useCreateVenueMutation } from '@/hooks/mutations/useCreateVenueMutation';
import { onboardingStore } from '@/Store/onboardingStore';

import { Button } from '@ui/Button';

export const WaiverStep = () => {
	const next = onboardingStore((state) => state.next);
	const back = onboardingStore((state) => state.back);
	const venue = onboardingStore((state) => state.venue);

	const createVenue = useCreateVenueMutation({ next });

	const handleCreateVenue = () => {
		createVenue.mutate({
			name: venue.name,
			email: venue.email,
			addressLine1: venue.addressLine1,
			addressLine2: venue.addressLine2,
			phoneNumber: venue.phoneNumber,
			city: venue.city,
			state: venue.state,
			logoImageUrl: venue.logoImageUrl,
			country: venue.country,
		});
	};

	return (
		<div className="flex flex-col space-y-6">
			<h1 className="text-lg text-primary">
        		Upload your existing waiver or use our default template.
			</h1>

			<Button variant="outline">
        		Upload PDF
			</Button>

			<div className="flex justify-end gap-4 pt-4">
				<Button
					variant="outline"
					onClick={back}
				>
          			Back
				</Button>

				<Button
					onClick={handleCreateVenue}
					disabled={createVenue.isPending}
				>
					{createVenue.isPending ? 'Creating...' : 'Go Live!'}
				</Button>
			</div>
		</div>
	);
};
