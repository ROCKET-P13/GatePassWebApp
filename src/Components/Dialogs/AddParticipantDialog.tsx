import { SortingState } from '@tanstack/react-table';
import { Button } from '@ui/Button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@ui/Dialog';
import { Input } from '@ui/Input';
import _ from 'lodash';
import { useMemo } from 'react';

import { useAddParticipantMutation } from '@/hooks/mutations/useAddParticipantMutation';
import { addParticipantStore } from '@/Store/addParticipantStore';

interface AddParticipantDialogProps {
	open: boolean;
	queryKey: (string | SortingState)[];
}

export const AddParticipantDialog = ({ open, queryKey }: AddParticipantDialogProps) => {
	const closeDialog = addParticipantStore((state) => state.closeDialog);
	const clearDialog = addParticipantStore((state) => state.clearDialog);
	const updateParticipantData = addParticipantStore((state) => state.updateParticipantData);
	const participantData = addParticipantStore((state) => state.participantData);

	const addParticipantMutation = useAddParticipantMutation({ queryKey });

	const createButtonIsDisabled = useMemo(() => {
		if (_.isEmpty(participantData?.firstName) || _.isEmpty(participantData?.lastName)) {
			return true;
		}

		return !_.every([
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
						disabled={createButtonIsDisabled}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>

		</Dialog>
	);
};
