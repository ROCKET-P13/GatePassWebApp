import { Stack, Button } from '@mui/material';
import { WidgetCard } from '../WidgetCard';
import { useState } from 'react';
import { AddEventDialog } from '../Events/AddEventDialog';

export const QuickActionsWidget = () => {
	const [open, setOpen] = useState(false);

	return (
		<WidgetCard title="Quick Actions">
			<Stack spacing={1}>
				<Button variant="contained">Create Event</Button>
			</Stack>

			<AddEventDialog open={open} onClose={() => setOpen(false)} />
		</WidgetCard>
	);
};
