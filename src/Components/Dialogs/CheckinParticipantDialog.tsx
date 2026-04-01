import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@ui/Dialog';

import { checkinParticipantStore } from '@/Store/checkinParticipantStore';
import { Event } from '@/types/Event';

interface CheckinParticipantDialogProps {
	open: boolean;
	event: Event;
};

export const CheckinParticipantDialog = ({ open, event }: CheckinParticipantDialogProps) => {
	const closeDialog = checkinParticipantStore((state) => state.closeDialog);
	const clearDialog = checkinParticipantStore((state) => state.clearDialog);

	const participant = checkinParticipantStore((state) => state.participant);

	const handleSubmit = () => {
		console.log({ participant, event });
		closeDialog();
	};

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			onExited={clearDialog}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Checkin Participant?</DialogTitle>
				</DialogHeader>

				<p>Checkin {`${participant.firstName} ${participant.lastName}`} for {`${event.name}?`}</p>

				<DialogFooter>
					<Button
						variant='outline'
						onClick={closeDialog}
					>
					Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant='default'
					>
					Checkin
					</Button>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	);
};