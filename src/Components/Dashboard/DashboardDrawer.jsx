import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Drawer
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import _ from 'lodash';

import { useDashboardStore } from '../../Store/userDashboardStore';

import { DashboardAppBar } from './DashboardAppBar';

const DrawerItems = Object.freeze({
	SETTINGS: {
		label: 'Settings',
		icon: <SettingsIcon style={{ color: '#ffff' }} />,
	},
	ACCOUNT: {
		label: 'Account',
		icon: <PersonIcon style={{  color: '#ffff' }}/>,
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
					sx={{ width: 250 }}
					role='presentation'
					onClick={toggleDrawer}
				>
					<List>
						{
							_.chain(DrawerItems).keys().map((drawerItemKey) => (
								<ListItem key={drawerItemKey} disablePadding>
									<ListItemButton>
										<ListItemIcon>
											{DrawerItems[drawerItemKey].icon}
										</ListItemIcon>
										<ListItemText primary={DrawerItems[drawerItemKey].label}/>
									</ListItemButton>
								</ListItem>
							)).value()
						}
					</List>
				</Box>
			</Drawer>
		</>
	);
};