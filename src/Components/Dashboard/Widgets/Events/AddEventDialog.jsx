import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

export const AddEventDialog = ({ open, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='sm'
		>
			<DialogTitle>Add Event</DialogTitle>

			<DialogContent>
				<Stack spacing={2} mt={1}>
					<TextField
						label="Event Name"
						fullWidth
						placeholder="Open Ride"
					/>

					<TextField
						label="Status"
						fullWidth
						placeholder="Live / Upcoming"
					/>
				</Stack>

				<DialogActions sx={{ paddingTop: 3 }}>
					<Button variant='outlined' onClick={onClose}>Cancel</Button>
					<Button variant='contained' onClick={onClose}>Save</Button>
				</DialogActions>
			</DialogContent>

		</Dialog>
	);
};