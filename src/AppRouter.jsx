import {
	createRouter,
	createRootRoute,
	createRoute,
	Navigate,
	Outlet,
	RouterProvider
} from '@tanstack/react-router';
import { CssBaseline } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import { VenueOnboarding } from './Components/Onboarding/VenueOnboarding';
import { DashboardDrawer } from './Components/Dashboard/DashboardDrawer';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { EventsPage } from './Components/Dashboard/Events/EventsPage';
import { PeoplePage } from './Components/Dashboard/People/PeoplePage';
import { LoginPage } from './Components/Login/LoginPage';
import { RequireAuth } from './Auth/RequireAuth';
import { Routes } from './Common/routes';
import { AppLoadingScreen } from './Components/Common/LoadingScreen';
import { AccountPage } from './Components/Account/AccountPage';
import { EventDetailsPage } from './Components/Dashboard/Events/EventDetailsPage';

const rootRoute = createRootRoute({
	component: () => (
		<>
			<CssBaseline />
			<Outlet />
		</>
	),
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: () => <Navigate to={Routes.DASHBOARD} />,
});

const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.LOGIN,
	component: LoginPage,
});

const onboardingRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.ONBOARDING,
	component: VenueOnboarding,
});

const protectedRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'protected',
	component: RequireAuth,
});

const dashboardRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: Routes.DASHBOARD,
	component: DashboardDrawer,
});

const dashboardIndexRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: '/',
	component: Dashboard,
});

const eventsRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.EVENTS,
	component: EventsPage,
});

const eventDetailsRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: `${Routes.EVENTS}/$eventId`,
	component: EventDetailsPage,
});

// eventsRoute.addChildren([eventDetailsRoute]);

const peopleRoute = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.PEOPLE,
	component: PeoplePage,
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
	component: AccountPage,
});

const userSettings = createRoute({
	getParentRoute: () => dashboardRoute,
	path: Routes.SETTINGS,
	component: () => <div>User Settings</div>,
});

dashboardRoute.addChildren([
	dashboardIndexRoute,
	eventsRoute,
	eventDetailsRoute,
	peopleRoute,
	waiversRoute,
	venueSettingsRoute,
	accountRoute,
	userSettings,
]);

protectedRoute.addChildren([dashboardRoute]);

const routeTree = rootRoute.addChildren([
	indexRoute,
	loginRoute,
	onboardingRoute,
	protectedRoute,
]);

const router = createRouter({ routeTree });

export const AppRouter = () => {
	const auth = useAuth0();

	if (auth.isLoading) {
		return <AppLoadingScreen message="Signing you in..." />;
	}

	return (
		<RouterProvider
			router={router}
			context={{
				isAuthenticated: auth.isAuthenticated,
			}}
		/>
	);
};
