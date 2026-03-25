import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetTodaysEventsQueryProps {
	queryKey: (string | SortingState[])[]
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