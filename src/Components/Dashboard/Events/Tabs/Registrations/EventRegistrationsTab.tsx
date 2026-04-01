import { Button } from '@ui/Button';
import { useState } from 'react';

import { CheckinParticipantDialog } from '@/Components/Dialogs/CheckinParticipantDialog';
import { useGetAllParticipantsQuery } from '@/hooks/queries/useGetAllParticipantsQuery';
import { useGetEventRegistrationsQuery } from '@/hooks/queries/useGetEventRegistrationsQuery';
import { checkinParticipantStore } from '@/stores/checkinParticipantStore';
import { registerParticipantStore } from '@/stores/registerParticipantStore';
import { Event } from '@/types/Event';

import { EventRegistrationsTable } from './EventRegistrationsTable';
import { RegisterParticipantDialog } from '../../../../Dialogs/RegisterParticipantDialog';

interface SortingState {
	id: string;
	desc: boolean;
}

interface EventRegistrationsTabProps {
	event: Event;
}

export const EventRegistrationsTab = ({ event }: EventRegistrationsTabProps) => {
	const [sorting, setSorting] = useState<SortingState[]>([]);

	const openRegisterParticipantDialog = registerParticipantStore((state) => state.openDialog);
	const isRegisterParticipantDialogOpen = registerParticipantStore((state) => state.isOpen);

	const isCheckinParticipantDialogOpen = checkinParticipantStore((state) => state.isOpen);

	const {
		data: registrations = [],
		isLoading: isParticipantRegistrationsLoading,
		error,
	} = useGetEventRegistrationsQuery({ eventId: event.id });

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
						eventId={event.id}
						participants={participants}
					/>
				)
			}

			<CheckinParticipantDialog
				open={isCheckinParticipantDialogOpen}
				event={event}
			/>

		</div>
	);
};
