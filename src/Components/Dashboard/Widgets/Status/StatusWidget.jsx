import { Stack } from '@mui/material';
import { WidgetCard } from '../WidgetCard';
import { Metric } from './Metric';

export const StatusWidget = () => {
	return (
		<WidgetCard>
			<Stack direction='row' spacing={4} justifyContent='center'>
				<Metric label='Venue' value='Open' />
				<Metric label='Event' value='Live' />
				<Metric label='Check-ins' value='28' />
				<Metric label='Waivers' value='24' />
			</Stack>
		</WidgetCard>
	);
};
