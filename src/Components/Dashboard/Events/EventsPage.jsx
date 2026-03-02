import { Box, Stack, Typography } from '@mui/material';
import { EventsTable } from './EventsTable';
import { useState } from 'react';
import { AddEventDialog } from '../Dialog/AddEventDialog';
import { useGetAllEventsQuery } from '../../../hooks/queries/useGetAllEventsQuery';
import { Button } from '../../ui/Button';
import { addEventStore } from '../../../Store/addEventStore';

export const EventsPage = () => {
	const [sorting, setSorting] = useState([]);
	const queryKey = ['events', sorting];

	const {
		openDialog: openAddEventDialog,
		isOpen: isAddEventDialogOpen,
	} = addEventStore((state) => state);

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
					onClick={() => openAddEventDialog()}
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
				open={isAddEventDialogOpen}
				queryKey={queryKey}
			/>
		</Box>
	);
};