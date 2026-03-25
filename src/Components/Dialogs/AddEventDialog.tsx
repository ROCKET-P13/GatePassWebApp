import { SortingState } from '@tanstack/react-table';
import { Button } from '@ui/Button';
import { DatePicker } from '@ui/DatePicker';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@ui/Dialog';
import { Input } from '@ui/Input';
import { Select } from '@ui/Select';
import { TimePicker } from '@ui/TimePicker';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventStatus } from '@/Common/EventStatus';
import { useAddEventMutation } from '@/hooks/mutations/useAddEventMutation';
import { addEventStore } from '@/Store/addEventStore';

interface AddEventDialogProps {
	open: boolean;
	queryKey: (string | SortingState)[];
}

export const AddEventDialog = ({ open, queryKey }: AddEventDialogProps) => {
	const closeDialog = addEventStore((state) => state.closeDialog);
	const clearDialog = addEventStore((state) => state.clearDialog);
	const updateEventData = addEventStore((state) => state.updateEventData);
	const eventData = addEventStore((state) => state.eventData);

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

	const createButtonIsDisabled = useMemo(() => {
		if (!eventDateTime) {
			return true;
		}

		return !_.every([
			eventData.name.length > 2 && eventData.name.length < 100,
			eventDateTime.isAfter(dayjs()),
		]);
	}, [eventData.name, eventDateTime]);

	const handleSubmit = () => {
		if (!eventDateTime) {
			return;
		}

		closeDialog();

		addEventMutation.mutate({
			name: eventData.name,
			startDateTime: eventDateTime,
			status: eventData.status,
			participantCapacity: eventData.participantCapacity,
			date: '',
			startTime: '',
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
						disabled={createButtonIsDisabled}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
