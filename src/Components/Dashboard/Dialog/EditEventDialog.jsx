import { useMemo } from 'react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { EventStatus } from '../../../Common/eventStatus';
import _ from 'lodash';
import { editEventStore } from '../../../Store/editEventStore';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../../ui/Dialog';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Input
						label="Name"
						value={eventDraft.name}
						onChange={(e) => updateEventDraft({ name: e.target.value })}
					/>
					<Select
						value={eventDraft.status}
						onChange={(status) => updateEventDraft({ status })}
					>
						<Select.Trigger label="Status" placeholder={eventDraft.status} />
						<Select.Content maxHeight={48}>
							<Select.Item value={EventStatus.DRAFT}>{EventStatus.DRAFT}</Select.Item>
							<Select.Item value={EventStatus.SCHEDULED}>{EventStatus.SCHEDULED}</Select.Item>
							<Select.Item value={EventStatus.OPEN}>{EventStatus.OPEN}</Select.Item>
						</Select.Content>
					</Select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<DatePicker
						label="Date"
						defaultValue={eventDraft.date}
						onChange={(value) => updateEventDraft({ date: value })}
					/>
					<TimePicker
						label="Start Time"
						defaultValue={eventDraft.startTime}
						onChange={(value) => updateEventDraft({ startTime: value })}
					/>
				</div>
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