import _ from 'lodash';
import { WidgetCard } from '../WidgetCard';
import { AddEventDialog } from '../../Dialog/AddEventDialog';
import { useMemo } from 'react';
import { EventsAPI } from '../../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { List, ListItem } from '../../../ui/List';
import { addEventStore } from '../../../../Store/addEventStore';
import { Link } from '@tanstack/react-router';
import { Routes } from '../../../../Common/routes';
import { EventStatusColorClass } from '../../../../Common/eventStatus';
import { SquarePlus } from 'lucide-react';
import { Icon } from '../../../ui/Icon';

export const TodaysEventsWidget = () => {
	const queryKey = ['events', 'today'];
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	const {
		openDialog: openAddEventDialog,
		isOpen: isAddEventDialogOpen,
	} = addEventStore((state) => state);

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const {
		data: events,
		isLoading,
		error,
	} = useQuery({
		queryKey,
		queryFn: () => eventsAPI.getTodays(),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});

	if (error) {
		return <h1>Failed to load events</h1>;
	}

	return (
		<>
			<WidgetCard
				title="Today's Events"
				action={
					<button
						className='p-1 rounded-md'
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
										: _.map(events, (event) => (
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
