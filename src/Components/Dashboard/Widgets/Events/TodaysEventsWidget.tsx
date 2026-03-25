import { Link } from '@tanstack/react-router';
import { Icon } from '@ui/Icon';
import { List, ListItem } from '@ui/List';
import _ from 'lodash';
import { SquarePlus } from 'lucide-react';

import { EventStatusColorClass } from '@/Common/EventStatus';
import { Routes } from '@/Common/routes';
import { AddEventDialog } from '@/Components/Dialogs/AddEventDialog';
import { useGetTodaysEventsQuery } from '@/hooks/queries/useGetTodaysEventsQuery';
import { addEventStore } from '@/Store/addEventStore';

import { WidgetCard } from '../WidgetCard';

export const TodaysEventsWidget = () => {
	const queryKey = ['events', 'today'];
	const openAddEventDialog = addEventStore((state) => state.openDialog);
	const isAddEventDialogOpen = addEventStore((state) => state.isOpen);

	const {
		data: events,
		isLoading,
		error,
	} = useGetTodaysEventsQuery({ queryKey });

	if (error) {
		return <h1>Failed to load events</h1>;
	}

	return (
		<>
			<WidgetCard
				title="Today's Events"
				action={
					<button
						className='p-1 rounded-md cursor-pointer'
						onClick={openAddEventDialog}
					>
						<Icon as={SquarePlus} />
					</button>
				}
			>
				{
					isLoading
						? <h1>Loading...</h1>
						: (
							<List>
								{
									_.isEmpty(events)
										? <h2 className='text-sm'>No Events</h2>
										: events?.map((event) => (
											<ListItem key={event.id}>
												<div>
													<Link
														to={`${Routes.DASHBOARD}/${Routes.EVENTS}/$eventId`}
														params={{ eventId: event.id }}
														className="text-primary hover:underline"
													>
														{event.name}
													</Link>
													<p className="font-sm text-muted-foreground">{event.startTime}</p>
												</div>
												<span className={`px-2 py-1 text-xs rounded-md font-medium ${EventStatusColorClass[event.status]}`}>
													{event.status}
												</span>
											</ListItem>
										))
								}
							</List>
						)
				}

			</WidgetCard>

			<AddEventDialog
				open={isAddEventDialogOpen}
				queryKey={queryKey}
			/>
		</>

	);
};
