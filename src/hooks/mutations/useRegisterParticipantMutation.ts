import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface Registration {
	id?: string;
	participantId: string;
	class: string;
	eventNumber: string;
	checkedIn: boolean;
}

interface MutationContext {
	previousRegistrations?: Registration[];
	temporaryId: string;
}

interface UseRegisterParticipantMutationProps {
	eventId: string;
}

export const useRegisterParticipantMutation = ({ eventId }: UseRegisterParticipantMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryKey = ['registrations', eventId];

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const queryClient = useQueryClient();
	return useMutation<unknown, Error, Registration, MutationContext>({
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
			await queryClient.cancelQueries({ queryKey });

			const previousRegistrations = queryClient.getQueryData<Registration[]>(queryKey);
			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData<Registration[]>(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newRegistration,
							id: temporaryId,
						},
					];
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
		onSuccess: (createdRegistration, _vars, context) => {
			queryClient.setQueryData<Registration[]>(
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
