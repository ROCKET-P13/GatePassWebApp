import { useLoaderData } from '@tanstack/react-router';
import { Tab, TabPanel, Tabs } from '@ui/Tabs';

import { Routes } from '@/Common/routes';
import { ParticipantRegistrationsTab } from '@/Components/Dashboard/Participants/Tabs/Registrations/ParticipantRegistrationsTab';
import { Participant } from '@/types/Participant';

const TabIds = Object.freeze({
	REGISTRATIONS: 'registrations',
});

export const ParticipantDetailsPage = () => {
	const participant = useLoaderData({
		from: Routes.PARTICIPANT_DETAILS,
	}) as Participant;

	return (
		<div>
			<div className='flex justify-between items-center mb-4'>
				<div className='flex flex-col items-start gap-2'>
					<h1 className='text-4xl font-semibold'>
						{`${participant.firstName} ${participant.lastName}`}
					</h1>

					<p className='text-muted-foreground'>
						Date Joined: {participant.createdAt}
					</p>

				</div>
			</div>

			<Tabs defaultValue={TabIds.REGISTRATIONS}>
				<Tab value={TabIds.REGISTRATIONS}>Registrations</Tab>

				<TabPanel value={TabIds.REGISTRATIONS}>
					<ParticipantRegistrationsTab participantId={participant.id} />
				</TabPanel>
			</Tabs>

		</div>
	);
};
