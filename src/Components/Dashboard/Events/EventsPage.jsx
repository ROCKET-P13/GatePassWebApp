import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';
import { useState } from 'react';
import { AddEventDialog } from '../Dialog/AddEventDialog';

export const EventsPage = () => {
	const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

	const events = [
		{
			id: 1,
			name: 'Open Ride',
			date: '2026-01-20',
			status: 'Live',
		},
		{
			id: 2,
			name: 'Kids Practice',
			date: '2026-01-22',
			status: 'Upcoming',
		},
	];

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
				<EventsTable events={events} />
			</Paper>

			<AddEventDialog open={isEventDialogOpen} onClose={() => setIsEventDialogOpen(false)} />
		</Box>
	);
};