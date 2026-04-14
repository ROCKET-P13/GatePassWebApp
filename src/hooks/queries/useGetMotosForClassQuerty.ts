import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { RaceAPI } from '@/API/RaceAPI';

interface UseGetMotosForClassQueryProps {
	eventId: string;
	eventClassId: string;
}

export const useGetMotosForClassQuery = ({ eventId, eventClassId }: UseGetMotosForClassQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const raceAPI = useMemo(
		() => new RaceAPI({ getAccessToken: getAccessTokenSilently, eventId }),
		[getAccessTokenSilently, eventId]
	);

	return useQuery({
		queryKey: ['motos', eventClassId],
		queryFn: async () => await raceAPI.getMotosByClassId({ eventClassId }),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};