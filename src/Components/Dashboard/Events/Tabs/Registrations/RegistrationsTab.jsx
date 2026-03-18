import { useState } from 'react';

import { useGetAllParticipantsQuery } from '@/hooks/queries/useGetAllParticipantsQuery';
import { useGetEventRegistrationsQuery } from '@/hooks/queries/useGetEventRegistrationsQuery';
import { addEventClassStore } from '@/Store/addEventClassStore';
import { registerParticipantStore } from '@/Store/registerParticipantStore';

import { RegistrationsTable } from './RegistrationsTable';
import { AddEventClassDialog } from '../../../../Dialogs/AddEventClassDialog';
import { RegisterParticipantDialog } from '../../../../Dialogs/RegisterParticipantDialog';
import { Button } from '@ui/Button';

export const RegistrationTab = ({ eventId }) => {
	const [sorting, setSorting] = useState([]);

	const {
		openDialog: openRegisterParticipantDialog,
		isOpen: isRegisterParticipantDialogOpen,
	} = registerParticipantStore((state) => state);

	const {
		openDialog: openCreateEventClassDialog,
		isOpen: isCreateEventClassDialogOpen,
	} = addEventClassStore((state) => state);

	const {
		data: registrations,
		isLoading,
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
				isLoading
					? (
						<p className="text-sm text-muted-foreground">
						Loading Registrations...
						</p>
					)
					: (
						<RegistrationsTable
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