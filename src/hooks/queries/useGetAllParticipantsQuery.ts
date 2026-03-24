import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ParticipantsAPI } from '@/API/ParticipantsAPI';

interface UseGetAllParticipantsQueryProps {
	queryKey: unknown[];
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
