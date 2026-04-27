import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UseGetAllEventClassesQueryProps {
	eventId: string;
}

export const useGetAllEventClassesQuery = ({ eventId }: UseGetAllEventClassesQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: ['classes', eventId],
		queryFn: () => eventsAPI.getClasses({ eventId }),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};