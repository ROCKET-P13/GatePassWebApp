import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { dashboardStore } from '../../Store/dashboardStore';
import MenuIcon from '@mui/icons-material/Menu';

export const DashboardAppBar = () => {
	const toggleDrawer = dashboardStore((state) => state.toggleDrawer);
	const drawerOpen = dashboardStore((state) => state.drawerOpen);
	return (
		<>
			<AppBar open={drawerOpen}>
				<Toolbar variant='regular'>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={(event) => {
							event.currentTarget.blur();
							toggleDrawer(!drawerOpen);
						}}
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