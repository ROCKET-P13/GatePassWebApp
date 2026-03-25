import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { SortingState } from '@tanstack/react-table';
import { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { EventsAPI } from '@/API/EventsAPI';
import { Event } from '@/types/Event';

interface UpdateEventParams {
	id: string;
	name: string;
	startDateTime: Dayjs;
	participantCapacity?: number;
	status: string;
}

interface MutationContext {
	previousEventData?: Event;
}

interface UseEditEventDetailsMutationProps {
	queryKey: (string | SortingState[])[];
}

export const useEditEventDetailsMutation = ({ queryKey }: UseEditEventDetailsMutationProps) => {
	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation<Event, Error, UpdateEventParams, MutationContext>({
		mutationFn: async (event) => await eventsAPI.update({
			id: event.id,
			name: event.name,
			startDateTime: event.startDateTime,
			participantCapacity: event.participantCapacity,
			status: event.status,
		}),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEventData = queryClient.getQueryData<Event>(queryKey);

			queryClient.setQueryData(
				queryKey,
				(oldEventData: Record<string, Event> = {}) => ({
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
			router.invalidate();
		},
	});
};
