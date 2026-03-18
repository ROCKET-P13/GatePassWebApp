import { useLoaderData } from '@tanstack/react-router';
import { Tab, TabPanel, Tabs } from '@ui/Tabs';

import { Routes } from '@/Common/routes';

export const ParticipantDetailsPage = () => {
	const participant = useLoaderData({
		from: `/protected${Routes.DASHBOARD}${Routes.PARTICIPANTS}/$participantId`,
	});

	const TabIds = Object.freeze({
		REGISTRATIONS: 'registrations',
	});

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
					<div>{participant.id}</div>
				</TabPanel>
			</Tabs>

		</div>
	);
};