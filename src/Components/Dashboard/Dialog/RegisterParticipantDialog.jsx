import { useMemo } from 'react';
import { registerParticipantStore } from '../../../Store/registerParticipantStore';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../../ui/Dialog';
import _ from 'lodash';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const RegisterParticipantDialog = ({ open, queryKey }) => {
	const {
		closeDialog,
		clearDialog,
		updateRegistrationData,
		registration,
	} = registerParticipantStore((state) => state);

	const formIsValid = useMemo(() => {
		return _.every([
			registration.firstName.length > 2 && registration.firstName.length < 100,
			registration.lastName.length > 2 && registration.lastName.length < 100,
			_.some(registration.class),
			_.some(registration.eventNumber),
		]);
	}, [
		registration.firstName,
		registration.lastName,
		registration.class,
		registration.eventNumber,
	]);

	const handleSubmit = () => {
		console.log({ registration });
	};
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			slotProps={{
				transition: { onExited: clearDialog },
			}}
		>
			<DialogContent>
				<DialogTitle>Register Participant</DialogTitle>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Input
						label="First Name"
						value={registration.firstName}
						onChange={(e) => updateRegistrationData({ firstName: e.target.value })}
					/>
					<Input
						label="Last Name"
						value={registration.lastName}
						onChange={(e) => updateRegistrationData({ lastName: e.target.value })}
					/>
					<Input
						label="Class"
						value={registration.class}
						onChange={(e) => updateRegistrationData({ class: e.target.value })}
					/>
					<Input
						label="Event Number"
						value={registration.eventNumber}
						onChange={(e) => updateRegistrationData({ eventNumber: e.target.value })}
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