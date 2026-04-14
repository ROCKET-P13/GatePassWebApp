import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useMemo } from 'react';

import { RaceAPI } from '@/API/RaceAPI';
import { Moto } from '@/types/Moto';

interface MutationContext {
	previousMotos?: Moto[];
}

interface UseCreateMotosMutationProps {
	queryKey: (string | SortingState)[];
	eventId: string;
}

export const useCreateMotosMutation = ({ queryKey, eventId }: UseCreateMotosMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const raceAPI = useMemo(
		() => new RaceAPI({ getAccessToken: getAccessTokenSilently, eventId }),
		[getAccessTokenSilently, eventId]
	);

	return useMutation<Moto[], Error, string, MutationContext>({
		mutationFn: async (eventClassId) => await raceAPI.createMotos({ eventClassId }),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const previousMotos = queryClient.getQueryData<Moto[]>(queryKey);

			return { previousMotos: previousMotos || [] };
		},
		onError: (_err, _eventId, context) => {
			if (!context) {
				return;
			}

			queryClient.setQueryData(
				queryKey,
				context.previousMotos
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});
};