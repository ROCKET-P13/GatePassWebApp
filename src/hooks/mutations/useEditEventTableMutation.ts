import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface Event {
	id: string;
	name: string;
	participantCapacity?: number;
	status: string;
	date: string;
	startTime: string;
	startDateTime: Dayjs;
}

interface UpdateEventParams {
	id: string;
	name: string;
	startDateTime: Dayjs;
	participantCapacity?: number;
	status: string;
}

interface MutationContext {
	previousEvents?: Event[];
}

interface UseEditEventTableMutationProps {
	queryKey: string[];
}

export const useEditEventTableMutation = ({ queryKey }: UseEditEventTableMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation<unknown, Error, UpdateEventParams, MutationContext>({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEvents = queryClient.getQueryData<Event[]>(queryKey);

			queryClient.setQueryData<Event[]>(
				queryKey,
				(oldEvents = []) => _.map(oldEvents, (event) => {
					return event.id === updatedEvent.id
						? {
							...event,
							...updatedEvent,
						}
						: event;
				})
			);
			
			return { previousEvents };
		},
		onError: (_err, _vars, context) => {
			if (!context) {
				return;
			}
			
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
