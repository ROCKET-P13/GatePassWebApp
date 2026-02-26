import { Box, Stack, Typography } from '@mui/material';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

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
				<PeopleFilters />
			</Stack>

			<PeopleTable people={[]} />
		</Box>
	);
};