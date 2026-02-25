import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';
import _ from 'lodash';

export const useDeleteEventMutation = ({ queryKey }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation({
		mutationFn: (eventId) => eventsAPI.delete({ eventId }),
		onMutate: async (eventId) => {
			await queryClient.cancelQueries({
				queryKey: queryKey,
			});

			const previousEvents = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(queryKey, (old) => {
				return _.filter(old, (event) => event.id !== eventId);
			});

			return { previousEvents };
		},
		onError: (_err, _eventId, context) => {
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