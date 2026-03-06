import { useMemo } from 'react';
import { useAddParticipantMutation } from '../../../hooks/mutations/useAddParticipantMutation';
import { addParticipantStore } from '../../../Store/addParticipantStore';
import _ from 'lodash';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../../ui/Dialog';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export const AddParticipantDialog = ({ open, queryKey }) => {
	const {
		closeDialog,
		clearDialog,
		updateParticipantData,
		participantData,
	} = addParticipantStore((state) => state);

	const addParticipantMutation = useAddParticipantMutation({ queryKey });

	const formIsValid = useMemo(() => {
		if (_.isEmpty(participantData?.firstName) || _.isEmpty(participantData?.lastName)) {
			return false;
		}

		return _.every([
			participantData.firstName.length > 2,
			participantData.firstName.length < 100,
			participantData.lastName.length > 2,
			participantData.lastName.length < 100,
		]);
	}, [participantData.firstName, participantData.lastName]);

	const handleSubmit = () => {
		closeDialog();

		addParticipantMutation.mutate({
			firstName: participantData.firstName,
			lastName: participantData.lastName,
		});
	};

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			onExited={clearDialog}
		>
			<DialogContent>
				<DialogTitle>Add Participant</DialogTitle>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Input
						label="First Name"
						value={participantData.firstName}
						onChange={(e) => updateParticipantData({ firstName: e.target.value })}
					/>
					<Input
						label="Last Name"
						value={participantData.lastName}
						onChange={(e) => updateParticipantData({ lastName: e.target.value })}
					/>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={closeDialog}>Cancel</Button>
					<Button
						variant='default'
						onClick={handleSubmit}
						disabled={!formIsValid}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	);
};