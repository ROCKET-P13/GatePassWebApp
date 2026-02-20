import { CheckinsWidget } from './Checkins/CheckinsWidget';
import { TodaysEventsWidget } from './Events/TodaysEventsWidget';
import { RevenueWidget } from './Revenue/RevenueWidget';
import { StatusWidget } from './Status/StatusWidget';
import { WaiverHealthWidget } from './Waivers/WaiverHealth';

export const widgetRegistry = {
	status: {
		component: StatusWidget,
		w: 12,
	},
	events: {
		component: TodaysEventsWidget,
		w: 6,
	},
	checkins: {
		component: CheckinsWidget,
		w: 6,
	},
	waivers: {
		component: WaiverHealthWidget,
		w: 6,
	},
	revenue: {
		component: RevenueWidget,
		w: 6,
	},
};