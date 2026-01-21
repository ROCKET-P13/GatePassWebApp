import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';

export const EventsPage = () => {
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

				<Button variant="contained">
					Add Event
				</Button>
			</Stack>

			<Paper sx={{ p: 2 }}>
				<EventsTable events={events} />
			</Paper>
		</Box>
	);
};