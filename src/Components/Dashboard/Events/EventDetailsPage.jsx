import { Box, Stack, Typography } from '@mui/material';
import { useParams } from '@tanstack/react-router';

export const EventDetailsPage = () => {
	const { eventId } = useParams({
		strict: false,
	});

	console.log({ eventId });
	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h5">Event Details: {eventId}</Typography>
			</Stack>
		</Box>
	);
};