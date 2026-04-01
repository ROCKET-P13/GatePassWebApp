import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';
import { EventRegistration } from '@/types/EventRegistration';

interface MutationContext {
	previousRegistrations?: EventRegistration[];
	temporaryId: string;
}

export const useCheckinParticipantMutation = ({ eventId } : { eventId: string }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryKey = ['registrations', eventId];
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const queryClient = useQueryClient();

	return useMutation<EventRegistration, Error, { participantId: string }, MutationContext>({
		mutationFn: async (params) => {
			return await eventsAPI.checkinParticipant({
				eventId,
				participantId: params.participantId,
			});
		},
		onMutate: async (updatedRegistration) => {
			await queryClient.cancelQueries({ queryKey });

			const previousRegistrations = queryClient.getQueryData<EventRegistration[]>(queryKey);
			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData<EventRegistration[]>(
				queryKey,
				(old = []) => {
					return _.map(old, (registration) => {
						if (registration.participantId == updatedRegistration.participantId) {
							return updatedRegistration;
						}

						return registration;
					}) as EventRegistration[];
				}
			);

			return { previousRegistrations, temporaryId };
		},
		onError: (_err, _vars, context) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(
				queryKey,
				context.previousRegistrations
			);
		},
		onSuccess: (updatedRegistration, _vars, context) => {
			queryClient.setQueryData<EventRegistration[]>(
				queryKey,
				(old = []) => {
					return _.map(old, (registration) => {
						if (registration.id == context.temporaryId) {
							return updatedRegistration;
						}

						return registration;
					});
				}
			);
		},
	});
};