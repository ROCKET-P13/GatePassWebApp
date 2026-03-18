import { useLoaderData } from '@tanstack/react-router';
import { Button } from '@ui/Button';
import { Tab, TabPanel, Tabs } from '@ui/Tabs';

import { EventStatusColorClass } from '@/Common/eventStatus';
import { Routes } from '@/Common/routes';
import { RegistrationTab } from '@/Components/Dashboard/Events/Tabs/Registrations/RegistrationsTab';
import { EditEventDialog } from '@/Components/Dialogs/EditEventDialog';
import { useEditEventDetailsMutation } from '@/hooks/mutations/useEditEventDetailsMutation';
import { editEventStore } from '@/Store/editEventStore';

export const EventDetailsPage = () => {
	const event = useLoaderData({ from: `/protected${Routes.DASHBOARD}${Routes.EVENTS}/$eventId` });
	const TabIds = Object.freeze({
		REGISTRATIONS: 'registrations',
		CHECK_INS: 'checkins',
		SETTINGS: 'settings',
	});

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
							participantCapacity: event.participantCapacity,
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
				<Tab value={TabIds.SETTINGS}>Settings</Tab>

				<TabPanel value={TabIds.REGISTRATIONS}>
					<RegistrationTab eventId={event.id} />
				</TabPanel>

				<TabPanel value={TabIds.CHECK_INS}>
					<h2>Check-Ins</h2>
				</TabPanel>

				<TabPanel value={TabIds.SETTINGS}>
					<h2>Settings</h2>
				</TabPanel>
			</Tabs>

			<EditEventDialog
				open={isEditEventDialogOpen}
				eventDraft={eventDraft}
				editEventMutation={editEventMutation}
			/>
		</div>
	);
};