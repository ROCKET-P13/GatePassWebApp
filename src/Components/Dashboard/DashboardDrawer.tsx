import { Outlet, useNavigate } from '@tanstack/react-router';
import { Drawer } from '@ui/Drawer';
import { NavigationItem } from '@ui/NavigationItem';
import { Calendar, FileCheckCorner, LayoutDashboard, Settings, SquareUser, UserCog, Users, LucideIcon } from 'lucide-react';

import { Routes } from '@/Common/routes';
import { dashboardStore } from '@/stores/dashboardStore';

import { DashboardAppBar } from './DashboardAppBar';

interface DrawerItem {
	label: string;
	icon: LucideIcon;
	route: string;
}

const DrawerItems: DrawerItem[] = [
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

const AccountDrawerItems: DrawerItem[] = [
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

	const handleNavigate = (route: string) => {
		toggleDrawer(false);
		navigate({ to: route });
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			<DashboardAppBar />

			<Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
				<Drawer.Content
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

					<Drawer.Footer className='flex flex-col'>
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
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer>

			<main className="pt-14 p-10">
				<Outlet />
			</main>
		</div>
	);
};
