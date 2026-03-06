import {
	Drawer,
	DrawerContent
} from '../ui/Drawer';

import { dashboardStore } from '../../Store/dashboardStore';
import { DashboardAppBar } from './DashboardAppBar';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { Routes } from '../../Common/routes';
import { NavigationItem } from '../ui/NavigationItem';
import { Calendar, FileCheckCorner, LayoutDashboard, Settings, SquareUser, UserCog, Users } from 'lucide-react';

const DrawerItems = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		route: Routes.DASHBOARD,
	},
	{
		label: 'Events',
		icon: Calendar,
		route: `${Routes.DASHBOARD}${Routes.EVENTS}`,
	},
	{
		label: 'Participants',
		icon: Users,
		route: `${Routes.DASHBOARD}${Routes.PARTICIPANTS}`,
	},
	{
		label: 'Waivers',
		icon: FileCheckCorner,
		route: `${Routes.DASHBOARD}${Routes.WAIVERS}`,
	},
	{
		label: 'Venue Settings',
		icon: Settings,
		route: `${Routes.DASHBOARD}${Routes.VENUE_SETTINGS}`,
	},
];

const AccountDrawerItems = [
	{
		label: 'Account',
		icon: SquareUser,
		route: `${Routes.DASHBOARD}${Routes.ACCOUNT}`,
	},
	{
		label: 'Settings',
		icon: UserCog,
		route: `${Routes.DASHBOARD}${Routes.SETTINGS}`,
	},
];

export const DashboardDrawer = () => {
	const toggleDrawer = dashboardStore((state) => state.toggleDrawer);
	const drawerOpen = dashboardStore((state) => state.drawerOpen);

	const navigate = useNavigate();

	const handleNavigate = (route) => {
		toggleDrawer(false);
		navigate({ to: route });
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<DashboardAppBar />

			<Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
				<DrawerContent
					open={drawerOpen}
					side="left"
					className="w-64 flex flex-col"
				>
					<div className="flex-1 p-4 space-y-1">
						{
							DrawerItems.map((item) => (
								<NavigationItem
									key={item.label}
									icon={item.icon}
									onClick={() => handleNavigate(item.route)}
								>
									{item.label}
								</NavigationItem>
							))
						}
					</div>

					<div className="border-t border-border p-4 space-y-1">
						{
							AccountDrawerItems.map((item) => (
								<NavigationItem
									key={item.label}
									icon={item.icon}
									onClick={() => handleNavigate(item.route)}
								>
									{item.label}
								</NavigationItem>
							))
						}
					</div>
				</DrawerContent>
			</Drawer>

			<main className="pt-14 p-10">
				<Outlet />
			</main>
		</div>
	);
};