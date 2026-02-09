import _ from 'lodash';
import { List, ListItem, ListItemText, Chip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { WidgetCard } from '../WidgetCard';
import { AddEventDialog } from '../../Dialog/AddEventDialog';
import { useMemo, useState } from 'react';
import { EventsAPI } from '../../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export const TodaysEventsWidget = () => {
	const [open, setOpen] = useState(false);
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const {
		data: events,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['events', 'today'],
		queryFn: () => eventsAPI.getTodays(),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});

	if (error) {
		return <Typography color="error">Failed to load events</Typography>;
	}

	return (
		<>
			<WidgetCard
				title="Today's Events"
				action={
					<IconButton
						color='inherit'
						onClick={() => setOpen(true)}
					>
						<AddBoxIcon />
					</IconButton>
				}
			>
				{
					isLoading
						? <Typography>Loading...</Typography>
						: (
							<List dense>
								{
									_.isEmpty(events)
										? <Typography variant='subtitle2'>No Events</Typography>
										: _.map(events, (event) => (
											<ListItem key={event.id} sx={{ paddingX: 0 }}>
												<ListItemText primary={event.name} sx={{ margin: 1 }} />
												<Chip
													label={event.status}
													color={event.status === 'Live' ? 'success' : 'default'}
													size="small"
													sx={{ margin: 1 }}
												/>
											</ListItem>
										))
								}
							</List>
						)
				}

			</WidgetCard>

			<AddEventDialog open={open} onClose={() => setOpen(false)} />
		</>

	);
};
