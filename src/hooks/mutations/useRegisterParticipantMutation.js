import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { EventsAPI } from '../../API/EventsAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

export const useRegisterParticipantMutation = ({ eventId }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryKey = ['registrations', eventId];

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (registration) => {
			await eventsAPI.registerParticipant({
				eventId,
				participantId: registration.participantId,
				eventNumber: registration.eventNumber,
				eventClass: registration.class,
				checkedIn: registration.checkedIn,
			});
		},
		onMutate: async (newRegistration) => {
			await queryClient.cancelQueries(queryKey);

			const previousRegistrations = queryClient.getQueryData(queryKey);

			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData(
				queryClient,
				(old = []) => {
					return [
						...old,
						{
							...newRegistration,
							id: temporaryId,
							isOptimistic: true,
						},
					];
				}
			);

			return { previousRegistrations, temporaryId };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousRegistrations
			);
		},
		onSettled: (createdRegistration, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				(old = []) => {
					return _.map(old, (registration) => {
						if (registration.id === context.temporaryId) {
							return createdRegistration;
						}
						return registration;
					});
				}
			);
		},
	});
};