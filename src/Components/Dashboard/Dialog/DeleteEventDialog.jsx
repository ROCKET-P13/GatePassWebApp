import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { deleteEventStore } from '../../../Store/deleteEventStore';
import { useDeleteEventMutation } from '../../../hooks/mutations/useDeleteEventMutation';

export const DeleteEventDialog = ({ open, eventToDelete, queryKey }) => {
	const {
		closeDialog,
		clearDialog,
	} = deleteEventStore((state) => state);

	const deleteEventMutation = useDeleteEventMutation({ queryKey });

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