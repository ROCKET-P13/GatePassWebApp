import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMemo } from 'react';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

export const DeleteEventDialog = ({ open, onClose, eventToDelete, onExited, sorting }) => {
	const { getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const queryClient = useQueryClient();

	const deleteEventMutation = useMutation({
		mutationFn: (eventId) => eventsAPI.delete({ eventId }),
		onMutate: async (eventId) => {
			await queryClient.cancelQueries({
				queryKey: ['events', sorting],
			});

			const previousEvents = queryClient.getQueryData(['events', sorting]);

			queryClient.setQueryData(['events', sorting], (old) => {
				return _.filter(old, (event) => event.id !== eventId);
			});

			return { previousEvents };
		},
		onError: (_err, _eventId, context) => {
			queryClient.setQueryData(
				['events', sorting],
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['events', sorting] });
		},
	});
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
			slotProps={{
				transition: { onExited },
			}}
		>
			<DialogTitle>Delete Event?</DialogTitle>

			<DialogContent>
				This will permanently delete {`${eventToDelete?.name}`}
			</DialogContent>

			<DialogActions>
				<Button
					variant="outlined"
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						onClose();
						deleteEventMutation.mutate(eventToDelete.id);
					}}
					color="error"
					variant="contained"
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};