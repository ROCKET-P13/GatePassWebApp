import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetEventRegistrationsQueryProps {
	eventId: string;
}

export const useGetEventRegistrationsQuery = ({ eventId }: UseGetEventRegistrationsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: ['registrations', eventId],
		queryFn: () => eventsAPI.getRegistrations({ eventId }),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};
