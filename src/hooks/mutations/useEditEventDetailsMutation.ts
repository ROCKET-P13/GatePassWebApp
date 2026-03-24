import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';

interface UpdateEventParams {
	id: string;
	name: string;
	startDateTime: Dayjs;
	participantCapacity?: number;
	status: string;
}

interface MutationContext {
	previousEventData?: unknown;
}

interface UseEditEventDetailsMutationProps {
	queryKey: string[];
}

export const useEditEventDetailsMutation = ({ queryKey }: UseEditEventDetailsMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<unknown, Error, UpdateEventParams, MutationContext>({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEventData = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(
				queryKey,
				(oldEventData: Record<string, unknown> = {}) => ({
					...oldEventData,
					...updatedEvent,
				})
			);

			return { previousEventData };
		},
		onError: (_err, _vars, context) => {
			if (!context) {
				return;
			}
			
			queryClient.setQueryData(
				queryKey,
				context.previousEventData
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
			router.invalidate({ to: '$eventId' });
		},
	});
};
