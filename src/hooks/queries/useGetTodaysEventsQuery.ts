import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetTodaysEventsQueryProps {
	queryKey: string[]
}

export const useGetTodaysEventsQuery = ({ queryKey }: UseGetTodaysEventsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey,
		queryFn: () => eventsAPI.getTodays(),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};