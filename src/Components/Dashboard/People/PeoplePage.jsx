import { Box, Paper, Stack, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { Button } from '../../ui/Button';

export const PeoplePage = () => {
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
					variant="default"
					startIcon={<PersonAddIcon />}
				>
					Invite
				</Button>
				<PeopleFilters />
			</Stack>

			<Paper sx={{ p: 2 }}>
				<PeopleTable people={[]} />
			</Paper>

		</Box>
	);
};