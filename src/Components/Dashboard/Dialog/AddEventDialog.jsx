import { useAuth0 } from '@auth0/auth0-react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField
} from '@mui/material';

import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';
import { EventsAPI } from '../../../API/EventsAPI';
import { useMutation } from '@tanstack/react-query';
import { useAddEventStore } from '../../../Store/useAddEventStore';
import dayjs from 'dayjs';
import _ from 'lodash';

export const AddEventDialog = ({ open, onClose }) => {
	const eventData = useAddEventStore((state) => state.eventData);
	const updateEventData = useAddEventStore((state) => state.updateEventData);

	const { getAccessTokenSilently } = useAuth0();

	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const addEventMutation = useMutation({
		mutationFn: (event) => eventsAPI.create(event),
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
		addEventMutation({
			name: eventData.name,
			startDateTime: eventDateTime.toISOString(),
			status: '',
			participantCapacity: 100,
		});
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='sm'
		>
			<DialogTitle>Add Event</DialogTitle>

			<DialogContent dividers>
				<Stack spacing={2} mt={1}>
					<TextField
						label="Event Name"
						fullWidth
						placeholder="Open Ride"
						value={eventData.name}
						onChange={(event) => updateEventData({ name: event.target.value })}
					/>

					<Stack direction="row" spacing={2}>
						<DatePicker
							label="Event Date"
							sx={{ width: '50%' }}
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

				</Stack>

				<DialogActions sx={{ marginTop: 4 }}>
					<Button variant='outlined' onClick={onClose}>Cancel</Button>
					<Button
						variant='contained'
						onClick={handleSubmit}
						disabled={!formIsValid}
					>Save</Button>
				</DialogActions>
			</DialogContent>

		</Dialog>
	);
};