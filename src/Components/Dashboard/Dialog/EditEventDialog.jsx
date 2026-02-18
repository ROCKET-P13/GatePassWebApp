import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo } from 'react';
import { EventsAPI } from '../../../API/EventsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { EventStatus } from '../../../Common/eventStatus';
import _ from 'lodash';
import { editEventStore } from '../../../Store/editEventStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

export const EditEventDialog = ({ open, eventData, sorting }) => {
	const { getAccessTokenSilently } = useAuth0();
	const eventsAPI = useMemo(
		() => new EventsAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const {
		closeDialog: closeEditEventDialog,
		updateField: updateEventData,
		clearDialog,
	} = editEventStore((state) => state);

	console.log({ eventData });

	const queryClient = useQueryClient();

	const editEventMutation = useMutation({
		mutationFn: (event) => eventsAPI.update(event),
		onMutate: async (updatedEvent) => {
			await queryClient.cancelQueries({ queryKey: ['events', sorting] });

			const previousEvents = queryClient.getQueryData(['events', sorting]);

			queryClient.setQueryData(
				['events', sorting],
				(old = []) => {
					return _.map(old, (event) => {
						if (event.id === updatedEvent.id) {
							return {
								...event,
								...updatedEvent,
								isOptimistic: true,
							};
						}

						return event;
					});
				}
			);

			return { previousEvents };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(
				['events', sorting],
				context.previousEvents
			);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['events', sorting] });
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
		closeEditEventDialog();
		editEventMutation.mutate({
			id: eventData.id,
			name: eventData.name,
			startDateTime: eventDateTime.toISOString(),
			status: eventData.status,
			participantCapacity: eventData.participantCapacity,
		});
	};

	return (
		    <Dialog
			open={open}
			onClose={closeEditEventDialog}
			fullWidth
			maxWidth="sm"
			slotProps={{
				transition: { onExited: clearDialog },
			}}
		>
			<DialogTitle>Edit Event</DialogTitle>

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
				<Button variant='outlined' onClick={closeEditEventDialog}>Cancel</Button>
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