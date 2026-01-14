import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useDashboardStore } from '../../Store/userDashboardStore';
import MenuIcon from '@mui/icons-material/Menu';

export const DashboardAppBar = () => {
	const toggleDrawer = useDashboardStore((state) => state.toggleDrawer);
	const drawerOpen = useDashboardStore((state) => state.drawerOpen);
	return (
		<>
			<AppBar
				position='fixed'
				open={drawerOpen}
				sx={{
					boxShadow: 0,
					bgcolor: 'background.paper',
					backgroundImage: 'none',
					borderBottom: '1px solid',
					borderColor: 'divider',
					top: 'var(--template-frame-height, 0px)',
				}}
			>
				<Toolbar variant='regular'>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						edge="start"
						sx={[
							{
								mr: 2,
							},
							drawerOpen && { display: 'none' },
						]}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
							GatePass
					</Typography>
				</Toolbar>

			</AppBar>
		</>
	);
};