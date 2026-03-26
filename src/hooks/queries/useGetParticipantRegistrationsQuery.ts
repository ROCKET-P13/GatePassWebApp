import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ParticipantsAPI } from '@/API/ParticipantsAPI';

interface UseGetParticipantRegistrationsQueryProps {
	participantId: string;
}

export const useGetParticipantRegistrationsQuery = ({ participantId }: UseGetParticipantRegistrationsQueryProps) => {
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const participantsAPI = useMemo(
		() => new ParticipantsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useQuery({
		queryKey: ['registrations', participantId],
		queryFn: () => participantsAPI.getRegistrations({ participantId: participantId }),
		enabled: isAuthenticated,
		placeholderData: (previousData) => previousData,
	});
};
