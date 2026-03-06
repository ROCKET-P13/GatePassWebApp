import { useMemo } from 'react';
import { addEventStore } from '../../../Store/addEventStore';
import dayjs from 'dayjs';
import _ from 'lodash';
import { EventStatus } from '../../../Common/eventStatus';
import { useAddEventMutation } from '../../../hooks/mutations/useAddEventMutation';

import { Dialog, DialogContent, DialogTitle, DialogFooter } from '../../ui/Dialog';
import { Button } from '../../ui/Button';
import { DatePicker } from '../../ui/DatePicker';
import { TimePicker } from '../../ui/TimePicker';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

export const AddEventDialog = ({ open, queryKey }) => {
	const {
		closeDialog,
		clearDialog,
		updateEventData,
		eventData,
	} = addEventStore((state) => state);

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
	}, [eventData.name, eventDateTime]);

	const handleSubmit = () => {
		closeDialog();

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
			onClose={closeDialog}
			onExited={clearDialog}
		>

			<DialogContent>
				<DialogTitle>Add Event</DialogTitle>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Input
						label="Name"
						value={eventData.name}
						onChange={(e) => updateEventData({ name: e.target.value })}
					/>
					<Select
						value={eventData.status}
						onChange={(status) => updateEventData({ status })}
					>
						<Select.Trigger label="Status" placeholder={eventData.status} />
						<Select.Content maxHeight={48}>
							<Select.Item value={EventStatus.DRAFT}>{EventStatus.DRAFT}</Select.Item>
							<Select.Item value={EventStatus.SCHEDULED}>{EventStatus.SCHEDULED}</Select.Item>
							<Select.Item value={EventStatus.OPEN}>{EventStatus.OPEN}</Select.Item>
						</Select.Content>
					</Select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<DatePicker
						label="Date"
						value={eventData.date}
						onChange={(value) => updateEventData({ date: value })}
					/>
					<TimePicker
						label="Start Time"
						value={eventData.startTime}
						onChange={(value) => updateEventData({ startTime: value })}
					/>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={closeDialog}>Cancel</Button>
					<Button
						variant='default'
						onClick={handleSubmit}
						disabled={!formIsValid}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};