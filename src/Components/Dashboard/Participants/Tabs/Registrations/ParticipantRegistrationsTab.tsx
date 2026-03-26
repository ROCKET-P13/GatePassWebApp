import { useState } from 'react';

import { ParticipantRegistrationsTable } from '@/Components/Dashboard/Participants/Tabs/Registrations/ParticipantRegistrationsTable';
import { useGetParticipantRegistrationsQuery } from '@/hooks/queries/useGetParticipantRegistrationsQuery';

interface SortingState {
	id: string;
	desc: boolean;
}
interface ParticipantRegistrationsTabProps {
	participantId: string;
}

export const ParticipantRegistrationsTab = ({ participantId }: ParticipantRegistrationsTabProps) => {
	const [sorting, setSorting] = useState<SortingState[]>([]);

	const {
		data: registrations = [],
		isLoading,
		error,
	} = useGetParticipantRegistrationsQuery({ participantId });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load participants
			</p>
		);
	}

	return (
		<div className='space-y-6'>
			{
				isLoading
					? (
						<p className="text-sm text-muted-foreground">
								Loading Registrations...
						</p>
					)
					: (
						<ParticipantRegistrationsTable
							registrations={registrations}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
					)
			}
		</div>
	);
};