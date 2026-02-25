import {
	Drawer,
	DrawerContent
} from '../ui/Drawer';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { dashboardStore } from '../../Store/dashboardStore';
import { DashboardAppBar } from './DashboardAppBar';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { Routes } from '../../Common/routes';
import { NavigationItem } from '../ui/NavigationItem';

const DrawerItems = [
	{
		label: 'Dashboard',
		icon: SpaceDashboardIcon,
		route: Routes.DASHBOARD,
	},
	{
		label: 'Events',
		icon: EventIcon,
		route: `${Routes.DASHBOARD}${Routes.EVENTS}`,
	},
	{
		label: 'People',
		icon: PeopleIcon,
		route: `${Routes.DASHBOARD}${Routes.PEOPLE}`,
	},
	{
		label: 'Waivers',
		icon: EditDocumentIcon,
		route: `${Routes.DASHBOARD}${Routes.WAIVERS}`,
	},
	{
		label: 'Venue Settings',
		icon: SettingsIcon,
		route: `${Routes.DASHBOARD}${Routes.VENUE_SETTINGS}`,
	},
];

const AccountDrawerItems = [
	{
		label: 'Account',
		icon: AccountBoxIcon,
		route: `${Routes.DASHBOARD}${Routes.ACCOUNT}`,
	},
	{
		label: 'Settings',
		icon: ManageAccountsIcon,
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
		<div className="min-h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
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

					<div className="border-t border-[rgb(var(--border))] p-4 space-y-1">
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

			<main className="pt-14 p-6">
				<Outlet />
			</main>
		</div>
	);
};