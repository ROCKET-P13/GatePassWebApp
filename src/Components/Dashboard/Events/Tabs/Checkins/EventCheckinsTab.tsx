import _ from 'lodash';
import { useState } from 'react';

import { EventCheckinsTable } from '@/Components/Dashboard/Events/Tabs/Checkins/EventCheckinsTable';
import { useGetEventRegistrationsQuery } from '@/hooks/queries/useGetEventRegistrationsQuery';

interface SortingState {
	id: string;
	desc: boolean;
}

interface EventCheckinsTabProps {
	eventId: string;
}

export const EventCheckinsTab = ({ eventId } : EventCheckinsTabProps) => {
	const [sorting, setSorting] = useState<SortingState[]>([]);

	const {
		data: registrations = [],
		isLoading: isParticipantRegistrationsLoading,
		error,
	} = useGetEventRegistrationsQuery({ eventId });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load check-ins
			</p>
		);
	}

	const checkIns = _.filter(registrations, 'checkedIn');

	return (
		<div className="space-y-6">
			{
				isParticipantRegistrationsLoading
					? (
						<p className="text-sm text-muted-foreground">
							Loading Checkins...
						</p>
					)
					: (
						<EventCheckinsTable
							checkIns={checkIns}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
					)
			}
		</div>
	);
};