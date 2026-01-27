import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';
import { useEffect, useMemo, useState } from 'react';
import { AddEventDialog } from '../Dialog/AddEventDialog';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';

export const EventsPage = () => {
	const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const [sorting, setSorting] = useState([]);
	const [loading, setLoading] = useState(false);

	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	useEffect(() => {
		let cancelled = false;
		const loadEvents = async () => {
			setLoading(true);

			try {
				const data = await eventsAPI.getEvents({ sorting });

				if (!cancelled) {
					setEvents(data);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		loadEvents();

		return () => {
			cancelled = true;
		};
	}, [sorting, isAuthenticated, eventsAPI]);

	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h4">Events</Typography>

				<Button
					variant="contained"
					onClick={() => setIsEventDialogOpen(true)}
				>
					Add Event
				</Button>
			</Stack>

			<Paper sx={{ p: 2 }}>
				{
					loading
						? <Typography>Loading Events...</Typography>
						: <EventsTable
							events={events}
							sorting={sorting}
							onSortingChange={setSorting}
						/>
				}

			</Paper>

			<AddEventDialog open={isEventDialogOpen} onClose={() => setIsEventDialogOpen(false)} />
		</Box>
	);
};