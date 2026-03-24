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
	startDateTime: Dayjs
}

type NewEvent = Omit<Event, 'id'>

interface MutationContext {
	previousEvents?: Event[];
	temporaryId: string;
}

interface UseAddeventMutationProps {
	queryKey: string[];
}

export const useAddEventMutation = ({ queryKey } : UseAddeventMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation<Event, Error, NewEvent, MutationContext>({
		mutationFn: async (event) => await eventsAPI.create({
			name: event.name,
			startDateTime: event.startDateTime,
			participantCapacity: event.participantCapacity,
			status: event.status,
		}),
		onMutate: async (newEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEvents = queryClient.getQueryData<Event[]>(queryKey);

			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData<Event[]>(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newEvent,
							id: temporaryId,
						},
					];
				}
			);

			return { previousEvents, temporaryId };
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
		onSuccess: (createdEvent, _variables, context) => {
			queryClient.setQueryData<Event[]>(
				queryKey,
				(old = []) => _.map(old, (event) => {
					if (event.id === context.temporaryId) {
						return createdEvent;
					}

					return event;
				})
			);
		},
	});
};