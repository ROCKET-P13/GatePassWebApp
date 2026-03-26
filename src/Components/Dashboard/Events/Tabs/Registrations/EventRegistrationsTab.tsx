import { Button } from '@ui/Button';
import { useState } from 'react';

import { useGetAllParticipantsQuery } from '@/hooks/queries/useGetAllParticipantsQuery';
import { useGetEventRegistrationsQuery } from '@/hooks/queries/useGetEventRegistrationsQuery';
import { addEventClassStore } from '@/Store/addEventClassStore';
import { registerParticipantStore } from '@/Store/registerParticipantStore';

import { EventRegistrationsTable } from './EventRegistrationsTable';
import { AddEventClassDialog } from '../../../../Dialogs/AddEventClassDialog';
import { RegisterParticipantDialog } from '../../../../Dialogs/RegisterParticipantDialog';

interface SortingState {
	id: string;
	desc: boolean;
}

interface EventRegistrationsTabProps {
	eventId: string;
}

export const EventRegistrationsTab = ({ eventId }: EventRegistrationsTabProps) => {
	const [sorting, setSorting] = useState<SortingState[]>([]);

	const openRegisterParticipantDialog = registerParticipantStore((state) => state.openDialog);
	const isRegisterParticipantDialogOpen = registerParticipantStore((state) => state.isOpen);

	const {
		openDialog: openCreateEventClassDialog,
		isOpen: isCreateEventClassDialogOpen,
	} = addEventClassStore((state) => state);

	const {
		data: registrations = [],
		isLoading: isParticipantRegistrationsLoading,
		error,
	} = useGetEventRegistrationsQuery({ eventId });

	const {
		data: participants = [],
		isLoading: isParticipantsLoading,
	} = useGetAllParticipantsQuery({ queryKey: ['participants', sorting] });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load participants
			</p>
		);
	}

	return (
		<div className="space-y-6">
			<div className='flex flex-row gap-4'>
				<Button
					variant="default"
					onClick={openRegisterParticipantDialog}
				>
					Register Participant
				</Button>
				<Button
					variant="default"
					onClick={openCreateEventClassDialog}
				>
					Add Class
				</Button>
			</div>
			{
				isParticipantRegistrationsLoading
					? (
						<p className="text-sm text-muted-foreground">
							Loading Registrations...
						</p>
					)
					: (
						<EventRegistrationsTable
							registrations={registrations}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
					)
			}

			{
				!isParticipantsLoading && (
					<RegisterParticipantDialog
						open={isRegisterParticipantDialogOpen}
						eventId={eventId}
						participants={participants}
					/>
				)
			}
			<AddEventClassDialog
				open={isCreateEventClassDialogOpen}
				eventId={eventId}
			/>

		</div>
	);
};
