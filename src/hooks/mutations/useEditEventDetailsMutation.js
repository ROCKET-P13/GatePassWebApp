import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

export const useEditEventDetailsMutation = ({ queryKey }) => {
	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEventData = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(
				queryKey,
				(oldEventData) => ({
					...oldEventData,
					...updatedEvent,
				})
			);

			return { previousEventData };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousEventData
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
			router.invalidate({ to: '$eventId' });
		},
	});
};