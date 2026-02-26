import { MenuItem, Stack, TextField } from '@mui/material';
import { useMemo } from 'react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { EventStatus } from '../../../Common/eventStatus';
import _ from 'lodash';
import { editEventStore } from '../../../Store/editEventStore';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../../ui/Dialog';
import { Button } from '../../ui/Button';

export const EditEventDialog = ({ open, eventDraft, editEventMutation }) => {
	const {
		closeDialog,
		updateEventDraft,
		clearDialog,
		originalEvent,
	} = editEventStore((state) => state);

	const eventDateTime = useMemo(() => {
		if (!eventDraft.startTime) {
			return null;
		}

		return eventDraft.date
			.hour(eventDraft.startTime.hour())
			.minute(eventDraft.startTime.minute())
			.second(0)
			.millisecond(0);
	}, [eventDraft.date, eventDraft.startTime]);

	const handleSubmit = () => {
		closeDialog();

		editEventMutation.mutate({
			id: eventDraft.id,
			name: eventDraft.name,
			startDateTime: eventDateTime.toISOString(),
			status: eventDraft.status,
			participantCapacity: eventDraft.participantCapacity,
		});
	};

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			fullWidth
			maxWidth="sm"
			slotProps={{
				transition: { onExited: clearDialog },
			}}
		>

			<DialogContent>
				<DialogTitle>Edit Event</DialogTitle>
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
						value={eventDraft.name}
						onChange={(e) => updateEventDraft({ name: e.target.value })}
						fullWidth
					/>
					<TextField
						select
						label="Status"
						sx={{ width: '25%' }}
						value={eventDraft.status}
						onChange={(e) => updateEventDraft({ status: e.target.value })}
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
						defaultValue={eventDraft.date}
						onChange={(value) => updateEventDraft({ date: value })}
					/>
					<TimePicker
						label="Start Time"
						sx={{ width: '50%' }}
						defaultValue={eventDraft.startTime}
						onChange={(value) => updateEventDraft({ startTime: value })}
					/>
				</Stack>
				<DialogFooter sx={{ mt: 3 }}>
					<Button variant='outline' onClick={closeDialog}>Cancel</Button>
					<Button
						variant='default'
						onClick={handleSubmit}
						disabled={_.isEqual(originalEvent, eventDraft)}
					>
					Save
					</Button>
	 			</DialogFooter>
			</DialogContent>

		</Dialog>
	);
};