import { useLoaderData } from '@tanstack/react-router';
import {
	Box,
	Typography,
	Button,
	Chip,
	Tabs,
	Tab,
	Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { EventStatus } from '../../../Common/eventStatus';

export const EventDetailsPage = () => {
	const event = useLoaderData({ strict: false });
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (ignore, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<Box>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={4}
			>
				<Box display="flex" flexDirection="column" alignItems="start">
					<Typography variant="h4" fontWeight={600}>
						{event.name}
					</Typography>

					<Typography variant="body1" color="text.secondary">
						{event.date} - {event.startTime}
					</Typography>

					<Chip
						label={event.status}
						color={event.status === EventStatus.OPEN ? 'success' : 'default'}
						size="small"
						sx={{ mt: 1 }}
					/>
				</Box>

				<Button
					variant="contained"
					startIcon={<EditIcon />}
				>
					Edit Event
				</Button>
			</Box>
			<Divider />

			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				sx={{ mt: 2 }}
			>
				<Tab label="Registrations" />
				<Tab label="Check-In" />
				<Tab label="Settings" />
			</Tabs>
		</Box>
	);
};