import { Stack, Button } from '@mui/material';
import { WidgetCard } from '../WidgetCard';

export const QuickActionsWidget = () => {
	return (
		<WidgetCard title="Quick Actions">
			<Stack spacing={1}>
				<Button variant="contained">Create Event</Button>
				<Button variant="outlined">Open Check-in</Button>
				<Button variant="outlined">View Waivers</Button>
				<Button variant="text">Invite Staff</Button>
			</Stack>
		</WidgetCard>
	);
};
