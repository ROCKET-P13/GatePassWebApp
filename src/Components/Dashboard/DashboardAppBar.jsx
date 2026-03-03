import {
	AppBar,
	AppBarLeft,
	AppBarRight,
	AppBarTitle
} from '../ui/AppBar';

import { dashboardStore } from '../../Store/dashboardStore';
import { MenuIcon } from 'lucide-react';

export const DashboardAppBar = () => {
	const toggleDrawer = dashboardStore((state) => state.toggleDrawer);

	return (
		<AppBar>
			<AppBarLeft>
				<button
					onClick={() => toggleDrawer(true)}
					className="p-2 rounded-md hover:bg-accent"
				>
					<MenuIcon fontSize="small" />
				</button>

				<AppBarTitle>
					GatePass
				</AppBarTitle>
			</AppBarLeft>

			<AppBarRight>
				<span className="text-sm text-muted-foreground">
					Welcome back
				</span>
			</AppBarRight>
		</AppBar>
	);
};