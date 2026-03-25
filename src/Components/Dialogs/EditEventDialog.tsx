import { UseMutationResult } from '@tanstack/react-query';
import { Button } from '@ui/Button';
import { DatePicker } from '@ui/DatePicker';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@ui/Dialog';
import { Input } from '@ui/Input';
import { Select } from '@ui/Select';
import { TimePicker } from '@ui/TimePicker';
import { Dayjs } from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';

import { EventStatus } from '@/Common/EventStatus';
import { editEventStore } from '@/Store/editEventStore';

interface EventDraft {
	id?: string;
	name: string;
	date: Dayjs | string;
	startTime: Dayjs | string;
	startDateTime?: Dayjs | string;
	status: string;
	participantCapacity: number | null;
}

interface EditEventDialogProps {
	open: boolean;
	eventDraft: EventDraft;
	editEventMutation: UseMutationResult
}

export const EditEventDialog = ({ open, eventDraft, editEventMutation }: EditEventDialogProps) => {
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

		const date = typeof eventDraft.date === 'string' ? eventDraft.date : eventDraft.date;
		const startTime = typeof eventDraft.startTime === 'string' ? eventDraft.startTime : eventDraft.startTime;

		return (date as Dayjs)
			.hour((startTime as Dayjs).hour())
			.minute((startTime as Dayjs).minute())
			.second(0)
			.millisecond(0);
	}, [eventDraft.date, eventDraft.startTime]);

	const handleSubmit = () => {
		closeDialog();

		editEventMutation.mutate({
			id: eventDraft.id,
			name: eventDraft.name,
			startDateTime: eventDateTime?.toISOString(),
			status: eventDraft.status,
			participantCapacity: eventDraft.participantCapacity,
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<DatePicker
						value={eventDraft.date as Dayjs}
						onChange={(value) => updateEventDraft({ date: value })}
					/>
					<TimePicker
						label="Start Time"
						value={eventDraft.startTime as Dayjs}
						onChange={(value) => updateEventDraft({ startTime: value })}
					/>
				</div>
				<DialogFooter>
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
