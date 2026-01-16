import _ from 'lodash';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Drawer,
	Divider
} from '@mui/material';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import SettingsIcon from '@mui/icons-material/Settings';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useDashboardStore } from '../../Store/userDashboardStore';
import { DashboardAppBar } from './DashboardAppBar';
import {  useNavigate } from '@tanstack/react-router';
import { Routes } from '../../Common/routes';

const DrawerItems = Object.freeze({
	DASHBOARD: {
		label: 'Dashboard',
		icon: <SpaceDashboardIcon style={{ color: '#ffff' }} />,
		route: Routes.DASHBOARD,
	},
	EVENTS: {
		label: 'Events',
		icon: <EventIcon style={{ color: '#ffff' }} />,
		route: `${Routes.DASHBOARD}${Routes.EVENTS}`,
	},
	PEOPLE: {
		label: 'People',
		icon: <PeopleIcon style={{ color: '#ffff' }} />,
		route: `${Routes.DASHBOARD}${Routes.PEOPLE}`,
	},
	WAIVERS: {
		label: 'Waivers',
		icon: <EditDocumentIcon style={{ color: '#ffff' }} />,
		route: `${Routes.DASHBOARD}${Routes.WAIVERS}`,
	},
	VENUE_SETTINGS: {
		label: 'Venue Settings',
		icon: <SettingsIcon style={{ color: '#ffff' }} />,
		route: `${Routes.DASHBOARD}${Routes.VENUE_SETTINGS}`,
	},
});

const AccountDrawerItems = Object.freeze({
	ACCOUNT: {
		label: 'Account',
		icon: <AccountBoxIcon style={{ color: '#ffff' }} />,
		route: `${Routes.DASHBOARD}${Routes.ACCOUNT}`,
	},
	SETTINGS: {
		label: 'Settings',
		icon: <ManageAccountsIcon style={{ color: '#ffff' }} />,
		route: `${Routes.DASHBOARD}${Routes.SETTINGS}`,
	},
});

export const DashboardDrawer = () =>  {
	const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);
	const drawerOpen = useDashboardStore((state) => state.drawerOpen);

	const navigate = useNavigate();
	return (
		<>
			<DashboardAppBar />
			<Drawer
				variant='temporary'
				open={drawerOpen}
				onClose={toggleDrawer}
				ModalProps={{
					keepMounted: true,
					disableAutoFocus: true,
					disableEnforceFocus: true,
				}}
			>
				<Box
					sx={{
						width: 250,
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
					}}
					role="presentation"
				>
					<Box>
						<List>
							{_.chain(DrawerItems).keys().map((drawerItemKey) => (
								<ListItem key={drawerItemKey} disablePadding>
									<ListItemButton onClick={() => {
										toggleDrawer(!drawerOpen);
										navigate({ to: DrawerItems[drawerItemKey].route });
									}}>
										<ListItemIcon>
											{DrawerItems[drawerItemKey].icon}
										</ListItemIcon>
										<ListItemText
											primary={DrawerItems[drawerItemKey].label}
										/>
									</ListItemButton>
								</ListItem>
							)).value()}
						</List>
					</Box>

					<Box sx={{ mt: 'auto' }}>
						<Divider />
						<Box>
							<List>
								{_.chain(AccountDrawerItems).keys().map((drawerItemKey) => (
									<ListItem key={drawerItemKey} disablePadding>
										<ListItemButton onClick={() => {
											toggleDrawer(!drawerOpen);
											navigate({ to: AccountDrawerItems[drawerItemKey].route });
										}}>
											<ListItemIcon>
												{AccountDrawerItems[drawerItemKey].icon}
											</ListItemIcon>
											<ListItemText
												primary={AccountDrawerItems[drawerItemKey].label}
											/>
										</ListItemButton>
									</ListItem>
								)).value()}
							</List>
						</Box>
					</Box>
				</Box>

			</Drawer>
		</>
	);
};