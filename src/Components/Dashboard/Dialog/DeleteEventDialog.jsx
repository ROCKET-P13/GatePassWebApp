import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const DeleteEventDialog = ({ open, onClose, eventToDelete, onExited }) => {
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
						console.log('confirm', eventToDelete);
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