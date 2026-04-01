import { UseMutationResult } from '@tanstack/react-query';
import { useLoaderData } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Tab, TabPanel, Tabs } from '@ui/Tabs';

import { EventStatusColorClass } from '@/Common/EventStatus';
import { Routes } from '@/Common/routes';
import { EventCheckinsTab } from '@/Components/Dashboard/Events/Tabs/Checkins/EventCheckinsTab';
import { EventClassesTab } from '@/Components/Dashboard/Events/Tabs/Classes/EventClassesTab';
import { EventRegistrationsTab } from '@/Components/Dashboard/Events/Tabs/Registrations/EventRegistrationsTab';
import { EditEventDialog } from '@/Components/Dialogs/EditEventDialog';
import { useEditEventDetailsMutation } from '@/hooks/mutations/useEditEventDetailsMutation';
import { editEventStore } from '@/stores/editEventStore';
import { Event } from '@/types/Event';

const TabIds = Object.freeze({
	REGISTRATIONS: 'registrations',
	CHECK_INS: 'checkins',
	CLASSES: 'classes',
});

export const EventDetailsPage = () => {
	const event = useLoaderData({ from: Routes.EVENT_DETAILS }) as Event;

	const openEditEventDialog = editEventStore((state) => state.openDialog);
	const isEditEventDialogOpen = editEventStore((state) => state.isOpen);
	const eventDraft = editEventStore((state) => state.eventDraft);
	const setEventDraft = editEventStore((state) => state.setEventDraft);

	const editEventMutation = useEditEventDetailsMutation({ queryKey: ['events', event.id] });

	return (
		<div>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex flex-col items-start gap-2'>
					<h1 className='text-4xl font-semibold'>
						{event.name}
					</h1>

					<p className='text-muted-foreground'>
						{event.date} - {event.startTime}
					</p>

					<span className={`px-2 py-1 text-xs rounded-md font-medium ${EventStatusColorClass[event.status]}`}>
						{event.status}
					</span>
				</div>
				<Button
					onClick={() => {
						openEditEventDialog();
						setEventDraft({
							id: event.id,
							name: event.name,
							status: event.status,
							participantCapacity: event.participantCapacity || null,
							startDateTime: event.startDateTime,
							startTime: event.startDateTime,
							date: event.startDateTime,
						});
					}}
				>
					Edit Event
				</Button>
			</div>

			<Tabs defaultValue={TabIds.REGISTRATIONS}>
				<Tab value={TabIds.REGISTRATIONS}>Registrations</Tab>
				<Tab value={TabIds.CHECK_INS}>Check-Ins</Tab>
				<Tab value={TabIds.CLASSES}>Classes</Tab>

				<TabPanel value={TabIds.REGISTRATIONS}>
					<EventRegistrationsTab event={event} />
				</TabPanel>

				<TabPanel value={TabIds.CHECK_INS}>
					<EventCheckinsTab eventId={event.id} />
				</TabPanel>

				<TabPanel value={TabIds.CLASSES}>
					<EventClassesTab event={event} />
				</TabPanel>
			</Tabs>

			<EditEventDialog
				open={isEditEventDialogOpen}
				eventDraft={eventDraft}
				editEventMutation={editEventMutation as UseMutationResult}
			/>
		</div>
	);
};
