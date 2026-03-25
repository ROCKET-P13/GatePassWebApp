import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetAllEventsQueryProps {
	queryKey: (string | SortingState)[];
	sorting: Array<{ id: string; desc: boolean }>;
}

export const useGetAllEventsQuery = ({ queryKey, sorting }: UseGetAllEventsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey,
		queryFn: () => eventsAPI.getAll({ sorting }),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};
