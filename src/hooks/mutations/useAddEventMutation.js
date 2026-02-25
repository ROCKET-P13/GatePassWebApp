import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';

export const useAddEventMutation = ({ queryKey }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation({
		mutationFn: (event) => eventsAPI.create(event),
		onMutate: async (newEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEvents = queryClient.getQueryData(queryKey);

			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newEvent,
							id: temporaryId,
							isOptimistic: true,
						},
					];
				});

			return { previousEvents, temporaryId };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onSuccess: (createdEvent, _variables, context) => {
			queryClient.setQueryData(
				queryKey
				, (old = []) => {
					return _.map(old, (event) => {
						if (event.id === context.temporaryId) {
							return createdEvent;
						}

						return event;
					});
				});
		},
	});
};