import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from '@mui/material';

export const ConfirmDialog = ({
	open,
	title = 'Are you sure?',
	description,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	onCancel,
	onExited,
}) => {
	return (
		<Dialog
			open={open}
			onClose={onCancel}
			maxWidth="xs"
			fullWidth
			slotProps={{
				transition: { onExited },
			}}
		>
			<DialogTitle>{title}</DialogTitle>

			<DialogContent>
				<DialogContentText>
					{description}
				</DialogContentText>
			</DialogContent>

			<DialogActions sx={{ padding: 3 }}>
				<Button variant="outlined" onClick={onCancel}>
					{cancelText}
				</Button>

				<Button
					onClick={onConfirm}
					color="error"
					variant="contained"
				>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
