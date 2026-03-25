import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';
import { Event } from '@/types/Event';

interface MutationContext {
	previousEvents?: Event[];
}

interface UseDeleteEventMutationProps {
	queryKey: (string | SortingState)[];
}

export const useDeleteEventMutation = ({ queryKey }: UseDeleteEventMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation<void, Error, string, MutationContext>({
		mutationFn: (eventId) => eventsAPI.delete({ eventId }),
		onMutate: async (eventId) => {
			await queryClient.cancelQueries({
				queryKey: queryKey,
			});

			const previousEvents = queryClient.getQueryData<Event[]>(queryKey);

			queryClient.setQueryData<Event[]>(queryKey, (old = []) => {
				return _.filter(old, (event) => event.id !== eventId);
			});

			return { previousEvents };
		},
		onError: (_err, _eventId, context) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(
				queryKey,
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKey });
		},
	});
};
