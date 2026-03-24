import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';

import { VenuesAPI } from '@/API/VenuesAPI';

interface VenueData {
	name: string;
	email: string;
	addressLine1: string;
	addressLine2?: string;
	phoneNumber: string;
	city: string;
	state: string;
	logoImageUrl?: string;
	country: string;
}

interface UseCreateVenueMutationProps {
	next: () => void;
}

export const useCreateVenueMutation = ({ next }: UseCreateVenueMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();

	const venuesAPI = useMemo(
		() => new VenuesAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation({
		mutationFn: async (venueData: VenueData) => await venuesAPI.create(venueData),
		onSuccess: (response) => {
			console.log('Venue Created:', response);
			next();
		},
	});
};
