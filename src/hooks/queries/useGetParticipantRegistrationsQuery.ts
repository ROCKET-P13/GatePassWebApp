import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetParticipantRegistrationsQueryProps {
	participantId: string;
}

export const useGetParticipantRegistrationsQuery = ({ participantId }: UseGetParticipantRegistrationsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: ['registrations', participantId],
		queryFn: () => eventsAPI.getRegistrations({ eventId: participantId }),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});
};
