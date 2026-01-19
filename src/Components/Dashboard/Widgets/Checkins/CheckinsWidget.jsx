import { List, ListItem, ListItemText } from '@mui/material';
import { WidgetCard } from '../WidgetCard';

export const CheckinsWidget = () => {
	const checkins = [
		{ id: 1, name: 'Alex Rider', time: '10:42 AM' },
		{ id: 2, name: 'Jamie Fox', time: '10:41 AM' },
	];

	return (
		<WidgetCard title="Live Check-ins">
			<List dense>
				{checkins.map(c => (
					<ListItem key={c.id}>
						<ListItemText
							primary={c.name}
							secondary={c.time}
						/>
					</ListItem>
				))}
			</List>
		</WidgetCard>
	);
};
