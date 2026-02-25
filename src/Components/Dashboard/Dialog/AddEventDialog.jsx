import { MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useMemo } from 'react';
import { addEventStore } from '../../../Store/addEventStore';
import dayjs from 'dayjs';
import _ from 'lodash';
import { EventStatus } from '../../../Common/eventStatus';
import { useAddEventMutation } from '../../../hooks/mutations/useAddEventMutation';

import { Dialog, DialogContent, DialogTitle, DialogFooter } from '../../ui/Dialog';
import { Button } from '../../ui/Button';

export const AddEventDialog = ({ open, onClose, queryKey }) => {
	const eventData = addEventStore((state) => state.eventData);
	const updateEventData = addEventStore((state) => state.updateEventData);

	const addEventMutation = useAddEventMutation({ queryKey });

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

			<DialogContent>
				<DialogTitle>Add Event</DialogTitle>
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
				<DialogFooter className="mt-2">
					<Button variant='outline' onClick={onClose}>Cancel</Button>
					<Button
						variant='default'
						onClick={handleSubmit}
						disabled={!formIsValid}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};