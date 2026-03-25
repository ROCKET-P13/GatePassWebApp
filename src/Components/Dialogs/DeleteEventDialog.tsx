import { SortingState } from '@tanstack/react-table';
import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@ui/Dialog';

import { useDeleteEventMutation } from '@/hooks/mutations/useDeleteEventMutation';
import { deleteEventStore } from '@/Store/deleteEventStore';

interface EventToDelete {
	id: string;
	name: string;
}

interface DeleteEventDialogProps {
	open: boolean;
	eventToDelete: EventToDelete;
	queryKey: (string | SortingState)[];
}

export const DeleteEventDialog = ({ open, eventToDelete, queryKey }: DeleteEventDialogProps) => {
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
			onExited={clearDialog}
		>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Event?</DialogTitle>
				</DialogHeader>
				<p>This will permanently delete {`${eventToDelete?.name}`}</p>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={closeDialog}
					>
					Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant="destructive"
					>
					Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
