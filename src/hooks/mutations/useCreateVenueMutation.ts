import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';

import { VenuesAPI } from '@/API/VenuesAPI';
import { Venue } from '@/types/Venue';

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
		mutationFn: async (venueData: Venue) => await venuesAPI.create(venueData),
		onSuccess: (response) => {
			console.log('Venue Created:', response);
			next();
		},
	});
};
