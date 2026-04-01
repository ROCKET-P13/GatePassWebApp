import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

export const useCheckinParticipantMutation = () => {
	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);
};