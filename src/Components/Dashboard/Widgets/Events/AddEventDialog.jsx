import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

export const AddEventDialog = ({ open, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='sm'
		>
			<DialogTitle>Add Event</DialogTitle>

			<DialogContent dividers>
				<Stack spacing={2} mt={1}>
					<TextField
						label="Event Name"
						fullWidth
						placeholder="Open Ride"
					/>

					<Box fullWidth sx={{ display: 'flex' }}>
						<TextField
							label="Status"
							placeholder="Live / Upcoming"
							sx={{ marginRight: 3 }}
						/>

						<TimePicker label="Event Time" />
					</Box>

				</Stack>

				<DialogActions sx={{ paddingTop: 3 }}>
					<Button variant='outlined' onClick={onClose}>Cancel</Button>
					<Button variant='contained' onClick={onClose}>Save</Button>
				</DialogActions>
			</DialogContent>

		</Dialog>
	);
};