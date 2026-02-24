import { useLoaderData, useRouter } from '@tanstack/react-router';
import {
	Box,
	Typography,
	Button,
	Chip,
	Tabs,
	Tab,
	Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useMemo, useState } from 'react';
import { EventStatusColorClass } from '../../../Common/eventStatus';
import { editEventStore } from '../../../Store/editEventStore';
import { EditEventDialog } from '../Dialog/EditEventDialog';
import { Routes } from '../../../Common/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';

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

	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);
	const queryClient = useQueryClient();
	const router = useRouter();

	const editEventMutation = useMutation({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEventData = queryClient.getQueryData(queryKey);

			queryClient.setQueryData(
				queryKey,
				(oldEventData) => ({
					...oldEventData,
					...updatedEvent,
					isOptimistic: true,
				})
			);

			return { previousEventData };
		},
		onError: (_err, _vars, context) => {
			console.log({ context });
			queryClient.setQueryData(
				queryKey,
				context.previousEventData
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
			router.invalidate({ to: '$eventId' });
		},
	});

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
					variant="contained"
					startIcon={<EditIcon />}
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