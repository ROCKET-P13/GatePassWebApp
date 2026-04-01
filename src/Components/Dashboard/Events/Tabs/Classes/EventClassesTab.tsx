import { Button } from '@ui/Button';
import { useState } from 'react';

import { EventClassesTable } from '@/Components/Dashboard/Events/Tabs/Classes/EventClassesTable';
import { AddEventClassDialog } from '@/Components/Dialogs/AddEventClassDialog';
import { useGetAllEventClassesQuery } from '@/hooks/queries/useGetAllEventClassesQuery';
import { addEventClassStore } from '@/stores/addEventClassStore';
import { Event } from '@/types/Event';

interface SortingState {
	id: string;
	desc: boolean;
}

interface EventClassesTabProps {
	event: Event;
}

export const EventClassesTab = ({ event }: EventClassesTabProps) => {
	const [sorting, setSorting] = useState<SortingState[]>([]);

	const openCreateEventClassDialog = addEventClassStore((state) => state.openDialog);
	const isCreateEventClassDialogOpen = addEventClassStore((state) => state.isOpen);

	const {
		data: eventClasses = [],
		isLoading: isEventClassesLoading,
		error,
	} = useGetAllEventClassesQuery({ eventId: event.id });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load participants
			</p>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex flex-row gap-4'>
				<Button
					variant='default'
					onClick={openCreateEventClassDialog}
				>
					Add Class
				</Button>
			</div>

			{
				isEventClassesLoading
					? (
						<p className="text-sm text-muted-foreground">
							Loading Event Classes...
						</p>
					)
					: (
						<EventClassesTable
							eventClasses={eventClasses}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
					)
			}

			<AddEventClassDialog
				open={isCreateEventClassDialogOpen}
				eventId={event.id}
			/>
		</div>
	);
};