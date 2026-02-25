import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { VenuesAPI } from '../../API/VenuesAPI';
import { useMutation } from '@tanstack/react-query';

export const useCreateVenueMutation = ({ next }) => {
	const { getAccessTokenSilently } = useAuth0();

	const venuesAPI = useMemo(
		() => new VenuesAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation({
		mutationFn: async (venueData) => await venuesAPI.create(venueData),
		onSuccess: (response) => {
			console.log('Venue Created:', response);
			next();
		},
	});
};