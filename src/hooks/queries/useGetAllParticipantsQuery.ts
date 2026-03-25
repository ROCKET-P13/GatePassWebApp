import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';

import { ParticipantsAPI } from '@/API/ParticipantsAPI';

interface UseGetAllParticipantsQueryProps {
	queryKey: (string | SortingState)[];
}

export const useGetAllParticipantsQuery = ({ queryKey }: UseGetAllParticipantsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const participantsAPI = useMemo(
		() => new ParticipantsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey,
		queryFn: () => participantsAPI.getAll(),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};
