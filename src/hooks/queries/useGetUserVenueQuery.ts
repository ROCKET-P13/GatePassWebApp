import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { UsersAPI } from '@/API/UsersAPI';

interface UseGetUserVenueQueryProps {
	queryKey: string[];
}

export const useGetUserVenueQuery = ({ queryKey } : UseGetUserVenueQueryProps) => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	const usersAPI = useMemo(
		() => new UsersAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey,
		queryFn: () => usersAPI.getVenue(),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};