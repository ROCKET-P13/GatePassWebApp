import { useState } from 'react';
import { Button } from '../../../../ui/Button';
import { useGetRegistrationsQuery } from '../../../../../hooks/queries/userGetRegistrationsQuery';
import { RegistrationsTable } from './RegistrationsTable';
import { registerParticipantStore } from '../../../../../Store/registerParticipantStore';
import { RegisterParticipantDialog } from '../../../Dialog/RegisterParticipantDialog';

export const RegistrationTab = ({ eventId }) => {
	const [sorting, setSorting] = useState([]);

	const {
		openDialog: openRegisterParticipantDialog,
		isOpen: isRegisterParticipantDialogOpen,
	} = registerParticipantStore((state) => state);

	const {
		data: registrations,
		isLoading,
		error,
	} = useGetRegistrationsQuery({ eventId });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load events
			</p>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<Button
					variant="default"
					onClick={openRegisterParticipantDialog}
				>
					Register Participant
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

			<RegisterParticipantDialog
				open={isRegisterParticipantDialogOpen}
			/>

		</div>
	);
};