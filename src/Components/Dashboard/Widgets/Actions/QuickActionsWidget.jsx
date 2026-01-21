import { Stack, Button } from '@mui/material';
import { WidgetCard } from '../WidgetCard';

export const QuickActionsWidget = () => {
	return (
		<WidgetCard title="Quick Actions">
			<Stack spacing={1}>
				<Button variant="contained">Create Event</Button>
			</Stack>
		</WidgetCard>
	);
};
