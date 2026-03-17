import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

export const useAddEventClassMutation = ({ eventId }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryKey = ['classes', eventId];

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (eventClass) => {
			await eventsAPI.addClass({
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
			await queryClient.cancelQueries(queryKey);

			const previousEventClasses = queryClient.getQueryData(queryKey);
			const temporaryId = Math.random.toString(32);

			queryClient.setQueryData(
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
			queryClient.setQueryData(
				queryKey,
				context.previousEventClasses
			);
		},
		onSuccess: (createdEventClass, _vars, context) => {
			queryClient.setQueryData(
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