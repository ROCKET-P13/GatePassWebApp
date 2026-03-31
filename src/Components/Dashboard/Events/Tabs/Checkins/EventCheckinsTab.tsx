import { useState } from 'react';

import { EventCheckinsTable } from '@/Components/Dashboard/Events/Tabs/Checkins/EventCheckinsTable';
import { useGetEventCheckinsQuery } from '@/hooks/queries/useGetEventCheckinsQuery';

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
		data: checkIns = [],
		isLoading: isParticipantCheckinsLoading,
		error,
	} = useGetEventCheckinsQuery({ eventId });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load check-ins
			</p>
		);
	}

	return (
		<div className="space-y-6">
			{
				isParticipantCheckinsLoading
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