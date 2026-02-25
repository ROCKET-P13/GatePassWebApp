import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';
import _ from 'lodash';

export const useEditEventTableMutation = ({ queryKey }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEvents = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(
				queryKey,
				(oldEvents = []) => _.map(oldEvents, (event) => {
					return event.id === updatedEvent.id
						? {
							...event,
							...updatedEvent,
							isOptimistic: true,
						}
						: event;
				})
			);
			;
			return { previousEvents };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});
};