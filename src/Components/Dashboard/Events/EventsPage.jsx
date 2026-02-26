import { Box, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';
import { useState } from 'react';
import { AddEventDialog } from '../Dialog/AddEventDialog';
import { useGetAllEventsQuery } from '../../../hooks/queries/useGetAllEventsQuery';
import { Button } from '../../ui/Button';

export const EventsPage = () => {
	const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
	const [sorting, setSorting] = useState([]);
	const queryKey = ['events', sorting];

	const {
		data: events,
		isLoading,
		error,
	} = useGetAllEventsQuery({ queryKey, sorting });

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
					variant="default"
					onClick={() => setIsEventDialogOpen(true)}
				>
                    Add Event
				</Button>
			</Stack>

			{
				isLoading
					? (
						<Typography>Loading Events...</Typography>
					)
					: (
						<>
							<EventsTable
								events={events}
								sorting={sorting}
								onSortingChange={setSorting}
							/>
						</>
					)
			}

			<AddEventDialog
				open={isEventDialogOpen}
				onClose={() => setIsEventDialogOpen(false)}
				queryKey={queryKey}
			/>
		</Box>
	);
};