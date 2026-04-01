import { Autocomplete } from '@ui/AutoComplete';
import { Button } from '@ui/Button';
import { Checkbox } from '@ui/Checkbox';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@ui/Dialog';
import { Input } from '@ui/Input';
import _ from 'lodash';
import { ChangeEvent, useMemo } from 'react';

import { useRegisterParticipantMutation } from '@/hooks/mutations/useRegisterParticipantMutation';
import { registerParticipantStore } from '@/stores/registerParticipantStore';
import { Participant } from '@/types/Participant';

interface RegisterParticipantDialogProps {
	open: boolean;
	eventId: string;
	participants: Participant[];
}

export const RegisterParticipantDialog = ({ open, eventId, participants }: RegisterParticipantDialogProps) => {
	const {
		closeDialog,
		clearDialog,
		updateRegistrationData,
		registration,
	} = registerParticipantStore((state) => state);

	const formIsValid = useMemo(() => {
		return _.every([
			_.some(registration.participantId),
			_.some(registration.class),
			_.some(registration.eventNumber),
		]);
	}, [
		registration.participantId,
		registration.class,
		registration.eventNumber,
	]);

	const registerParticipantMutation = useRegisterParticipantMutation({ eventId });

	const handleSubmit = () => {
		closeDialog();
		registerParticipantMutation.mutate({
			participantId: registration.participantId,
			eventNumber: registration.eventNumber,
			class: registration.class,
			checkedIn: registration.checkedIn,
		});
	};

	const selectedParticipant = useMemo(() => {
		return _.find(participants, (p) => p.id === registration.participantId) || null;
	}, [participants, registration.participantId]);

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			onExited={clearDialog}
		>
			<DialogContent>
				<DialogTitle>Register Participant</DialogTitle>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Autocomplete
						options={participants}
						getOptionLabel={(participant) => participant ? `${participant.firstName} ${participant.lastName}` : ''}
						placeholder='Search Participants...'
						label="Participant"
						value={selectedParticipant}
						onChange={(participant) => {
							updateRegistrationData({ participantId: participant.id });
						}}
					/>
					<Input
						label="Class"
						value={registration.class}
						alphanumeric
						onChange={(e) => updateRegistrationData({ class: e.target.value })}
					/>
					<Input
						label="Event Number"
						className="w-25"
						value={registration.eventNumber}
						alphanumeric
						onChange={(e) => updateRegistrationData({ eventNumber: e.target.value })}
					/>
					<Checkbox
						label="Checked In"
						checked={registration.checkedIn}
						onChange={(e: ChangeEvent<HTMLInputElement>) => updateRegistrationData({ checkedIn: e.target.checked })}
					/>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={closeDialog}>Cancel</Button>
					<Button
						variant="default"
						onClick={handleSubmit}
						disabled={!formIsValid}
					>
						Register
					</Button>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	);
};
