import _ from 'lodash';
import { List, ListItem, ListItemText, Chip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { WidgetCard } from '../WidgetCard';

export const TodaysEventsWidget = () => {
	const events = [
		{
			id: 1,
			name: 'Open Ride',
			status: 'Live',
		},
		{
			id: 2,
			name: 'Kids Practice',
			status: 'Upcoming',
		},
	];

	return (
		<WidgetCard
			title="Today's Events"
			action={
				<IconButton color='inherit'>
					<AddBoxIcon />
				</IconButton>
			}
		>
			<List dense>
				{
					_.map(events, (event) => (
						<ListItem key={event.id}>
							<ListItemText primary={event.name} sx={{ margin: 1 }} />
							<Chip
								label={event.status}
								color={event.status === 'Live' ? 'success' : 'default'}
								size="small"
								sx={{ margin: 1 }}
							/>
						</ListItem>
					))
				}
			</List>
		</WidgetCard>
	);
};
