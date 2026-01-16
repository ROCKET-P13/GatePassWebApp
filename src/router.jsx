import {
	createRouter,
	createRootRoute,
	createRoute,
	Navigate
} from '@tanstack/react-router';

import { Outlet } from '@tanstack/react-router';
import { CssBaseline, Container } from '@mui/material';

import { VenueOnboarding } from './Components/Onboarding/VenueOnboarding';
import { Routes } from './Common/routes';
import { DashboardDrawer } from './Components/Dashboard/DashboardDrawer';

const rootRoute = createRootRoute({
	component: () => (
		<>
			<CssBaseline />
			<Container>
				<Outlet />
			</Container>
		</>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: () => <Navigate to={Routes.ONBOARDING} />,
});

const onboardingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.ONBOARDING,
	component: VenueOnboarding,
});

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.DASHBOARD,
	component: DashboardDrawer,
	children: [
		createRoute({
			getParentRoute: () => dashboardRoute,
			path: '/',
			component: () => <div>Dashboard</div>,
		}),
	],
});

const eventsRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.EVENTS,
	component: () => <div>Events</div>,
});

const peopleRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.PEOPLE,
	component: () => <div>People</div>,
});

const waiversRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.WAIVERS,
	component: () => <div>Waivers</div>,
});

const venueSettingsRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.VENUE_SETTINGS,
	component: () => <div>Venue Settings</div>,
});

const accountRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.ACCOUNT,
	component: () => <div>Account</div>,
});

const settingsRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.SETTINGS,
	component: () => <div>Settings</div>,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	onboardingRoute,
	dashboardRoute,
	eventsRoute,
	peopleRoute,
	waiversRoute,
	venueSettingsRoute,
	accountRoute,
	settingsRoute,
]);

export const router = createRouter({ routeTree });
