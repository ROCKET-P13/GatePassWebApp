import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface EventClass {
	id: string;
	name: string;
	gender?: string;
	skillLevel?: string;
	maximumAge?: number;
	minimumAge?: number;
	participantCapacity?: number;
}

type NewEventClass = Omit<EventClass, 'id'>

interface MutationContext {
	previousEventClasses?: EventClass[];
	temporaryId: string;
}
interface UseAddEventClassMutationProps {
	eventId: string;
}

export const useAddEventClassMutation = ({ eventId } : UseAddEventClassMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryKey = ['classes', eventId];

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const queryClient = useQueryClient();

	return useMutation<EventClass, Error, NewEventClass, MutationContext>({
		mutationFn: async (eventClass) => {
			return await eventsAPI.addClass({
				eventId,
				name: eventClass.name,
				gender: eventClass.gender,
				skillLevel: eventClass.skillLevel,
				maximumAge: eventClass.maximumAge,
				minimumAge: eventClass.minimumAge,
				participantCapacity: eventClass.participantCapacity,
			});
		},
		onMutate: async (newEventClass) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEventClasses = queryClient.getQueryData<EventClass[]>(queryKey);
			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData<EventClass[]>(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newEventClass,
							id: temporaryId,
						},
					];
				}
			);

			return { previousEventClasses, temporaryId };
		},
		onError: (_error, _vars, context) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(
				queryKey,
				context.previousEventClasses
			);
		},
		onSuccess: (createdEventClass, _vars, context) => {
			queryClient.setQueryData<EventClass[]>(
				queryKey,
				(old = []) => {
					return _.map(old, (eventClass) => {
						if (eventClass.id === context.temporaryId) {
							return createdEventClass;
						}
						return eventClass;
					});
				}
			);
		},
	});
};