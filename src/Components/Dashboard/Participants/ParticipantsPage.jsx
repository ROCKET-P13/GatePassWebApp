import { useState } from 'react';

import { useGetAllParticipantsQuery } from '@/hooks/queries/useGetAllParticipantsQuery';
import { addParticipantStore } from '@/Store/addParticipantStore';

import { ParticipantsFilter } from './ParticipantsFilters';
import { ParticipantsTable } from './ParticipantsTable';
import { AddParticipantDialog } from '../../Dialogs/AddParticipantDialog';
import { Button } from '@ui/Button';

export const ParticipantsPage = () => {
	const [sorting, setSorting] = useState([]);
	const queryKey = ['participants', sorting];

	const openAddParticipantDialog = addParticipantStore((state) => state.openDialog);
	const isAddParticipantDialogOpen = addParticipantStore((state) => state.isOpen);

	const {
		data: participants,
		isLoading,
		error,
	} = useGetAllParticipantsQuery({ queryKey });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load participants
			</p>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold tracking-tight">
					Participants
				</h1>

				<div className="flex flex-row items-end space-x-4">
					<ParticipantsFilter />
					<Button
						variant="default"
						onClick={openAddParticipantDialog}
					>
						Add Participant
					</Button>
				</div>

			</div>
			{
				isLoading
					? (
						<p className="text-sm text-muted-foreground">
							Loading participants...
						</p>
					)
					: (
						<ParticipantsTable
							participants={participants}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
					)
			}

			{
				isAddParticipantDialogOpen
				&& <AddParticipantDialog
					open={isAddParticipantDialogOpen}
					queryKey={queryKey}
				/>
			}

		</div>
	);
};