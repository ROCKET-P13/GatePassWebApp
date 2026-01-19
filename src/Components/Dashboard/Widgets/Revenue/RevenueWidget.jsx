import { Stack, Typography } from '@mui/material';
import { WidgetCard } from '../WidgetCard';

export const RevenueWidget = () => {
	return (
		<WidgetCard title="Revenue Today">
			<Stack>
				<Typography variant="h4">$3,420</Typography>
				<Typography variant="caption" color="text.secondary">
					Across all events
				</Typography>
			</Stack>
		</WidgetCard>
	);
};
