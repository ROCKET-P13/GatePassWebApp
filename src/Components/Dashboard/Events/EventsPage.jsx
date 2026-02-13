import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';
import { useState, useMemo } from 'react';
import { AddEventDialog } from '../Dialog/AddEventDialog';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export const EventsPage = () => {
	const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
	const [sorting, setSorting] = useState([]);

	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const {
		data: events,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ['events', sorting],
		queryFn: () => eventsAPI.getAll({ sorting }),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});

	if (error) {
		return <Typography color="error">Failed to load events</Typography>;
	}

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
					isLoading
						? (
							<Typography>Loading Events...</Typography>
						)
						: (
							<EventsTable
								events={events}
								sorting={sorting}
								onSortingChange={setSorting}
							/>
						)
				}
			</Paper>

			<AddEventDialog
				open={isEventDialogOpen}
				onClose={() => setIsEventDialogOpen(false)}
				onEventAdded={refetch}
			/>
		</Box>
	);
};