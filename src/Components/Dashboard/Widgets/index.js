import { CheckinsWidget } from './Checkins/CheckinsWidget';
import { TodaysEventsWidget } from './Events/TodaysEventsWidget';
import { RevenueWidget } from './Revenue/RevenueWidget';
import { StatusWidget } from './Status/StatusWidget';
import { WaiverHealthWidget } from './Waivers/WaiverHealth';

export const widgetRegistry = {
	status: {
		component: StatusWidget,
		className: 'col-span-12',
	},
	events: {
		component: TodaysEventsWidget,
		className: 'col-span-6',
	},
	checkins: {
		component: CheckinsWidget,
		className: 'col-span-6',
	},
	waivers: {
		component: WaiverHealthWidget,
		className: 'col-span-6',
	},
	revenue: {
		component: RevenueWidget,
		className: 'col-span-6',
	},
};