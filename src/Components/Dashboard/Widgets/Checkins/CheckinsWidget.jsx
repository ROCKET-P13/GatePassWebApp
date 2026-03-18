import { List, ListItem } from '@ui/List';
import { WidgetCard } from '../WidgetCard';

export const CheckinsWidget = () => {
	const checkins = [
		{ id: 1, name: 'Alex Rider', time: '10:42 AM' },
		{ id: 2, name: 'Jamie Fox', time: '10:41 AM' },
	];

	return (
		<WidgetCard title="Live Check-ins">
			<List className="divide-y-0 border-0 rounded-none bg-transparent">
				{
					checkins.map((data) => (
						<ListItem
							key={data.id}
							className="px-0 py-2"
						>
							<h1 className='text-primary'>{data.name}</h1>
							<p className="font-sm text-muted-foreground">{data.time}</p>
						</ListItem>
					))
				}
			</List>
		</WidgetCard>
	);
};