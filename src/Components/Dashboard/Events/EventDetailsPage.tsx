import { UseMutationResult } from '@tanstack/react-query';
import { useLoaderData } from '@tanstack/react-router';
import { Icon } from '@ui/Icon';
import { Tab, TabPanel, Tabs } from '@ui/Tabs';
import { Tooltip } from '@ui/Tooltip';
import { Settings } from 'lucide-react';

import { Routes } from '@/Common/routes';
import { EventClassList } from '@/Components/Dashboard/Events/EventClassList';
import { EventCheckinsTab } from '@/Components/Dashboard/Events/Tabs/Checkins/EventCheckinsTab';
import { EventClassesTab } from '@/Components/Dashboard/Events/Tabs/Classes/EventClassesTab';
import { MotosTab } from '@/Components/Dashboard/Events/Tabs/Motos/MotosTab';
import { EventRegistrationsTab } from '@/Components/Dashboard/Events/Tabs/Registrations/EventRegistrationsTab';
import { EditEventDialog } from '@/Components/Dialogs/EditEventDialog';
import { useEditEventDetailsMutation } from '@/hooks/mutations/useEditEventDetailsMutation';
import { editEventStore } from '@/stores/editEventStore';
import { Event } from '@/types/Event';

const TabIds = Object.freeze({
	MOTOS: 'motos',
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
					<div className='flex flex-row gap-2'>
						<h1 className='text-4xl font-semibold'>
							{event.name}
						</h1>
						<Tooltip content='Edit Event'>
							<button
								className='p-1 rounded-md cursor-pointer'
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
								<Icon size={20} as={Settings} />
							</button>
						</Tooltip>
					</div>
					<p className='text-muted-foreground'>
						{event.date} - {event.startTime}
					</p>
				</div>
			</div>
			<EventClassList eventId={event.id}/>

			<Tabs defaultValue={TabIds.MOTOS}>
				<Tab value={TabIds.MOTOS}>Motos</Tab>
				<Tab value={TabIds.REGISTRATIONS}>Registrations</Tab>
				<Tab value={TabIds.CHECK_INS}>Check-Ins</Tab>
				<Tab value={TabIds.CLASSES}>Classes</Tab>

				<TabPanel value={TabIds.MOTOS}>
					<MotosTab eventId={event.id} />
				</TabPanel>

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
