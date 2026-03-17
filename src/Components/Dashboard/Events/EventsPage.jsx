import { useState } from 'react';
import { EventsTable } from './EventsTable';
import { AddEventDialog } from '../../Dialogs/AddEventDialog';
import { useGetAllEventsQuery } from '../../../hooks/queries/useGetAllEventsQuery';
import { Button } from '../../ui/Button';
import { addEventStore } from '../../../Store/addEventStore';

export const EventsPage = () => {
	const [sorting, setSorting] = useState([]);
	const queryKey = ['events', sorting];

	const openAddEventDialog = addEventStore((state) => state.openDialog);
	const isAddEventDialogOpen = addEventStore((state) => state.isOpen);

	const {
		data: events,
		isLoading,
		error,
	} = useGetAllEventsQuery({ queryKey, sorting });

	if (error) {
		return (
			<p className="text-sm font-medium text-red-500">
				Failed to load events
			</p>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold tracking-tight">
					Events
				</h1>

				<Button
					variant="default"
					onClick={openAddEventDialog}
				>
					Add Event
				</Button>
			</div>

			{
				isLoading
					? (
						<p className="text-sm text-muted-foreground">
							Loading events...
						</p>
					)
					: (
						<EventsTable
							events={events}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
					)
			}

			{
				isAddEventDialogOpen
				&& <AddEventDialog
					open={isAddEventDialogOpen}
					queryKey={queryKey}
				/>
			}

		</div>
	);
};