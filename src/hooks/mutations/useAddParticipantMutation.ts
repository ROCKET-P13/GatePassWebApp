import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useMemo } from 'react';

import { ParticipantsAPI } from '@/API/ParticipantsAPI';
import { Participant } from '@/types/Participant';

interface NewParticipant {
	firstName: string;
	lastName: string;
}

interface MutationContext {
	previousParticipants?: Participant[];
	temporaryId: string;
}

interface UseAddParticipantMutationProps {
	queryKey: string[];
}

export const useAddParticipantMutation = ({ queryKey }: UseAddParticipantMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const participantsAPI = useMemo(
		() => new ParticipantsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation<Participant, Error, NewParticipant, MutationContext>({
		mutationFn: async (participant) => await participantsAPI.create(participant),
		onMutate: async (newParticipant) => {
			await queryClient.cancelQueries({ queryKey });

			const previousParticipants = queryClient.getQueryData<Participant[]>(queryKey);

			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData<Participant[]>(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newParticipant,
							id: temporaryId,
							createdAt: '',
						},
					];
				}
			);

			return { previousParticipants, temporaryId };
		},
		onError: (_err, _vars, context) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(
				queryKey,
				context.previousParticipants
			);
		},
		onSuccess: (createdParticipant, _vars, context) => {
			queryClient.setQueryData<Participant[]>(
				queryKey,
				(old = []) => _.map(old, (participant) => {
					if (participant.id === context.temporaryId) {
						return createdParticipant;
					}

					return participant;
				})
			);
		},
	});
};
