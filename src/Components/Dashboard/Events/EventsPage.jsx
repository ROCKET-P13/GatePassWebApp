import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';
import { useState } from 'react';
import { AddEventDialog } from '../Widgets/Events/AddEventDialog';

export const EventsPage = () => {
	const [open, setOpen] = useState(false);

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
					onClick={() => setOpen(true)}
				>
					Add Event
				</Button>
			</Stack>

			<Paper sx={{ p: 2 }}>
				<EventsTable events={events} />
			</Paper>

			<AddEventDialog open={open} onClose={() => setOpen(false)} />
		</Box>
	);
};