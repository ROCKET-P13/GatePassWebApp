import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useMemo } from 'react';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { deleteEventStore } from '../../../Store/deleteEventStore';

export const DeleteEventDialog = ({ open, eventToDelete, queryKey }) => {
	const {
		closeDialog,
		clearDialog,
	} = deleteEventStore((state) => state);

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
				queryKey: queryKey,
			});

			const previousEvents = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(queryKey, (old) => {
				return _.filter(old, (event) => event.id !== eventId);
			});

			return { previousEvents };
		},
		onError: (_err, _eventId, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKey });
		},
	});

	const handleSubmit = () => {
		closeDialog();
		deleteEventMutation.mutate(eventToDelete.id);
	};

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			fullWidth
			maxWidth="sm"
			slotProps={{
				transition: { onExited: clearDialog },
			}}
		>
			<DialogTitle>Delete Event?</DialogTitle>

			<DialogContent>
				This will permanently delete {`${eventToDelete?.name}`}
			</DialogContent>

			<DialogActions>
				<Button
					variant="outlined"
					onClick={closeDialog}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit}
					color="error"
					variant="contained"
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};