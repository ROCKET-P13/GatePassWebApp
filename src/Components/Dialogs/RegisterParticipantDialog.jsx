import { useMemo } from 'react';
import { registerParticipantStore } from '../../Store/registerParticipantStore';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/Dialog';
import _ from 'lodash';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useRegisterParticipantMutation } from '../../hooks/mutations/useRegisterParticipantMutation';
import { Autocomplete } from '../ui/AutoComplete';
import { Checkbox } from '../ui/Checkbox';

export const RegisterParticipantDialog = ({ open, eventId, participants }) => {
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
						getOptionLabel={(participant) => `${participant.firstName} ${participant.lastName}`}
						placeholder='Search Participants...'
						label="Participant"
						value={registration.participantId}
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
						onChange={(e) => updateRegistrationData({ checkedIn: e.target.checked })}
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