import { useAuth0 } from '@auth0/auth0-react';
import { ParticipantsAPI } from '../../API/ParticipantsAPI';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useGetAllParticipantsQuery = ({ queryKey }) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const participantsAPI = useMemo(
		() => new ParticipantsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey,
		queryFn: () => participantsAPI.getAll(),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});
};