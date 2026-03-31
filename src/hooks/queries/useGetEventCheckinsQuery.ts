import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetEventCheckinsQueryProps {
	eventId: string;
}

export const useGetEventCheckinsQuery = ({ eventId }: UseGetEventCheckinsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: ['checkins', eventId],
		queryFn: () => eventsAPI.getCheckins({ eventId }),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};