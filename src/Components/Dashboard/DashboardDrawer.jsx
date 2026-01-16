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

const DrawerItems = Object.freeze({
	DASHBOARD: {
		label: 'Dashboard',
		icon: <SpaceDashboardIcon style={{ color: '#ffff' }} />,
	},
	EVENTS: {
		label: 'Events',
		icon: <EventIcon style={{ color: '#ffff' }} />,
	},
	PEOPLE: {
		label: 'People',
		icon: <PeopleIcon style={{ color: '#ffff' }} />,
	},
	WAIVERS: {
		label: 'Waivers',
		icon: <EditDocumentIcon style={{ color: '#ffff' }} />,
	},
	VENUE_SETTINGS: {
		label: 'Venue Settings',
		icon: <SettingsIcon style={{ color: '#ffff' }} />,
	},
});

const AccountDrawerItems = Object.freeze({
	ACCOUNT: {
		label: 'Account',
		icon: <AccountBoxIcon style={{ color: '#ffff' }} />,
	},
	SETTINGS: {
		label: 'Settings',
		icon: <ManageAccountsIcon style={{ color: '#ffff' }} />,
	},
});

export const DashboardDrawer = () =>  {
	const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);
	const drawerOpen = useDashboardStore((state) => state.drawerOpen);
	return (
		<>
			<DashboardAppBar />
			<Drawer open={drawerOpen} onClose={toggleDrawer}>
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
									<ListItemButton>
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
										<ListItemButton>
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