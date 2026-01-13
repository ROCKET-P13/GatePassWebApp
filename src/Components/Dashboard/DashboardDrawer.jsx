import {
	Box,
	Button,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Drawer
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDashboardStore } from '../../Store/userDashboardStore';

export const DashboardDrawer = () =>  {
	const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);
	const drawerOpen = useDashboardStore((state) => state.drawerOpen);
	return (
		<>
			<Button variant='contained' onClick={toggleDrawer}>Open</Button>
			<Drawer open={drawerOpen} onClose={toggleDrawer}>
				<Box
					sx={{ width: 250 }}
					role='presentation'
					onClick={toggleDrawer}
				>
					<List>
						{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
};