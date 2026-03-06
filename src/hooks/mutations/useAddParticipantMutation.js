import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { ParticipantsAPI } from '../../API/ParticipantsAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

export const useAddParticipantMutation = ({ queryKey }) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const participantsAPI = useMemo(
		() => new ParticipantsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	return useMutation({
		mutationFn: async (participant) => await participantsAPI.create(participant),
		onMutate: async (newParticipant) => {
			await queryClient.cancelQueries(queryKey);

			const previousParticipants = queryClient.getQueryData(queryKey);

			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newParticipant,
							id: temporaryId,
							isOptimistic: true,
						},
					];
				}
			);

			return { previousParticipants, temporaryId };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousParticipants
			);
		},
		onSettled: (createdParticipant, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				(old = []) => {
					return _.map(old, (participant) => {
						if (participant.id === context.temporaryId) {
							return createdParticipant;
						}

						return participant;
					});
				}
			);
		},
	});
};