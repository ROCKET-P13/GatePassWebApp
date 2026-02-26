import {
	Box,
	Typography,
	Chip,
	Tabs,
	Tab,
	Divider
} from '@mui/material';
import { useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import { EventStatusColorClass } from '../../../Common/eventStatus';
import { editEventStore } from '../../../Store/editEventStore';
import { EditEventDialog } from '../Dialog/EditEventDialog';
import { Routes } from '../../../Common/routes';
import { useEditEventDetailsMutation } from '../../../hooks/mutations/useEditEventDetailsMutation';
import { Button } from '../../ui/Button';

export const EventDetailsPage = () => {
	const event = useLoaderData({ from: `/protected${Routes.DASHBOARD}${Routes.EVENTS}/$eventId` });
	const queryKey = ['events', event.id];
	const [activeTab, setActiveTab] = useState(0);

	const {
		openDialog: openEditEventDialog,
		isOpen: isEditEventDialogOpen,
		eventDraft,
		setEventDraft,
	} = editEventStore((state) => state);

	const handleTabChange = (ignore, newValue) => {
		setActiveTab(newValue);
	};

	const editEventMutation = useEditEventDetailsMutation({ queryKey });

	return (
		<Box>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Box display="flex" flexDirection="column" alignItems="start">
					<Typography variant="h4" fontWeight={600}>
						{event.name}
					</Typography>

					<Typography variant="body1" color="text.secondary">
						{event.date} - {event.startTime}
					</Typography>

					<Chip
						label={event.status}
						color={EventStatusColorClass[event.status]}
						size="small"
						sx={{ mt: 1 }}
					/>
				</Box>
				<Button
					onClick={() => {
						openEditEventDialog();
						setEventDraft({
							id: event.id,
							name: event.name,
							status: event.status,
							participantCapacity: event.participantCapacity,
							startDateTime: event.startDateTime,
							startTime: event.startDateTime,
							date: event.startDateTime,
						});
					}}
				>
					Edit Event
				</Button>
			</Box>
			<Divider />

			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				sx={{ mt: 2 }}
			>
				<Tab label="Registrations" />
				<Tab label="Check-Ins" />
				<Tab label="Settings" />
			</Tabs>
			{
				isEditEventDialogOpen
				&& <EditEventDialog
					open={isEditEventDialogOpen}
					eventDraft={eventDraft}
					queryKey={['events', event.id]}
					editEventMutation={editEventMutation}
				/>
			}
		</Box>
	);
};