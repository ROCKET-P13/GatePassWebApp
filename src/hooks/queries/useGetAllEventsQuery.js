import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';
import { useQuery } from '@tanstack/react-query';

export const useGetAllEventsQuery = ({ queryKey, sorting }) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: queryKey,
		queryFn: () => eventsAPI.getAll({ sorting }),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});
};