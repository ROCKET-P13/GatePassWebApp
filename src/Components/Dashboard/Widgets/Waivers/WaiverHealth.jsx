import { Stack, Typography, LinearProgress } from '@mui/material';
import { WidgetCard } from '../WidgetCard';

export const WaiverHealthWidget = () => {
	const signed = 124;
	const total = 128;
	const percent = Math.round((signed / total) * 100);

	return (
		<WidgetCard title="Waiver Health">
			<Stack spacing={1}>
				<Typography variant="h6">
					{signed} / {total} signed
				</Typography>
				<LinearProgress
					variant="determinate"
					value={percent}
				/>
				<Typography variant="caption" color="text.secondary">
					{percent}% complete
				</Typography>
			</Stack>
		</WidgetCard>
	);
};
