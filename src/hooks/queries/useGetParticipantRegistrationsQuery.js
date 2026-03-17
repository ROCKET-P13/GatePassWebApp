import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';
import { useQuery } from '@tanstack/react-query';

export const useGetParticipantRegistrationsQuery = ({ participantId }) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: ['registrations', participantId],
		queryFn: () => eventsAPI.getRegistrations({ eventId }),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});
};