import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
	const people = [
		{
			id: 1,
			firstName: 'Alex',
			lastName: 'Rider',
			role: 'Rider',
			status: 'Checked In',
			waiverStatus: 'Complete',
			lastEvent: 'Open Ride',
		},
		{
			id: 1,
			firstName: 'Alex',
			lastName: 'Rider',
			role: 'Rider',
			status: 'Registered',
			waiverStatus: 'Missing',
			lastEvent: 'Open Ride',
		},
	];

	return (
		<Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h5">People</Typography>

				<Button
					variant="contained"
					startIcon={<PersonAddIcon />}
				>
					Invite
				</Button>
				<PeopleFilters />
			</Stack>

			<Paper sx={{ p: 2 }}>
				<PeopleTable people={people} />
			</Paper>

		</Box>
	);
};