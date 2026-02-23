import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Stack,
	TextField
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';
import { EventsAPI } from '../../../API/EventsAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEventStore } from '../../../Store/addEventStore';
import dayjs from 'dayjs';
import _ from 'lodash';
import { EventStatus } from '../../../Common/eventStatus';

export const AddEventDialog = ({ open, onClose, queryKey }) => {
	const eventData = addEventStore((state) => state.eventData);
	const updateEventData = addEventStore((state) => state.updateEventData);

	const { getAccessTokenSilently } = useAuth0();
	const queryClient = useQueryClient();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const addEventMutation = useMutation({
		mutationFn: (event) => eventsAPI.create(event),
		onMutate: async (newEvent) => {
			await queryClient.cancelQueries({ queryKey });

			const previousEvents = queryClient.getQueryData(queryKey);

			const temporaryId = Math.random().toString(32);

			queryClient.setQueryData(
				queryKey,
				(old = []) => {
					return [
						...old,
						{
							...newEvent,
							id: temporaryId,
							isOptimistic: true,
						},
					];
				});

			return { previousEvents, temporaryId };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				queryKey,
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: queryKey });
		},
		onSuccess: (createdEvent, _variables, context) => {
			queryClient.setQueryData(
				queryKey
				, (old = []) => {
					return _.map(old, (event) => {
						if (event.id === context.temporaryId) {
							return createdEvent;
						}

						return event;
					});
				});
		},
	});

	const eventDateTime = useMemo(() => {
		if (!eventData.startTime) {
			return null;
		}

		return eventData.date
			.hour(eventData.startTime.hour())
			.minute(eventData.startTime.minute())
			.second(0)
			.millisecond(0);
	}, [eventData.date, eventData.startTime]);

	const formIsValid = useMemo(() => {
		return _.every([
			eventData.name.length > 2 && eventData.name.length < 100,
			eventDateTime.isAfter(dayjs()),
		]);
	}, [eventData, eventDateTime]);

	const handleSubmit = () => {
		onClose();
		addEventMutation.mutate({
			name: eventData.name,
			startDateTime: eventDateTime.toISOString(),
			status: eventData.status,
			participantCapacity: eventData.participantCapacity,
		});
	};

	return (
		    <Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>Add Event</DialogTitle>

			<DialogContent>
				<Stack
					direction='row'
					spacing={3}
					sx={{
						justifyContent: 'start',
						marginTop: 3,
					}}
				>
					<TextField
						sx={{ maxWidth: '60%' }}
						label="Name"
						value={eventData.name}
						onChange={(e) => updateEventData({ name: e.target.value })}
						fullWidth
					/>
					<TextField
						select
						label="Status"
						sx={{ width: '25%' }}
						value={eventData.status}
						onChange={(e) => updateEventData({ status: e.target.value })}
					>
						<MenuItem value={EventStatus.DRAFT}>{EventStatus.DRAFT}</MenuItem>
						<MenuItem value={EventStatus.SCHEDULED}>{EventStatus.SCHEDULED}</MenuItem>
						<MenuItem value={EventStatus.OPEN}>{EventStatus.OPEN}</MenuItem>
					</TextField>

				</Stack>

				<Stack spacing={3} mt={3} direction='row'>
					<DatePicker
						label="Date"
						sx={{ width: '50%' }}
						disablePast
						defaultValue={eventData.date}
						onChange={(value) => updateEventData({ date: value })}
					/>
					<TimePicker
						label="Start Time"
						sx={{ width: '50%' }}
						defaultValue={eventData.startTime}
						onChange={(value) => updateEventData({ startTime: value })}
					/>
				</Stack>

			</DialogContent>
			<DialogActions sx={{ mt: 3 }}>
				<Button variant='outlined' onClick={onClose}>Cancel</Button>
				<Button
					variant='contained'
					onClick={handleSubmit}
					disabled={!formIsValid}
				>
						Save
				</Button>
	 			</DialogActions>
		</Dialog>
	);
};