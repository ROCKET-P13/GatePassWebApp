import {
	createRouter,
	createRootRoute,
	createRoute,
	Navigate,
	Outlet,
	RouterProvider
} from '@tanstack/react-router';
import { CssBaseline } from '@mui/material';

import { VenueOnboarding } from './Components/Onboarding/VenueOnboarding';
import { Routes } from './Common/routes';
import { DashboardDrawer } from './Components/Dashboard/DashboardDrawer';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { EventsPage } from './Components/Dashboard/Events/EventsPage';
import { PeoplePage } from './Components/Dashboard/People/PeoplePage';
import { LoginPage } from './Components/Login/LoginPage';
import { RequireAuth } from './Components/Auth/RequireAuth';
import { useAuth0 } from '@auth0/auth0-react';

export const AppRouter = () => {
	const auth = useAuth0();

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
		component: () => <div>Account</div>,
	});

	const settingsRoute = createRoute({
		getParentRoute: () => dashboardRoute,
		path: Routes.SETTINGS,
		component: () => <div>Settings</div>,
	});

	dashboardRoute.addChildren([
		dashboardIndexRoute,
		eventsRoute,
		peopleRoute,
		waiversRoute,
		venueSettingsRoute,
		accountRoute,
		settingsRoute,
	]);

	const routeTree = rootRoute.addChildren([
		indexRoute,
		loginRoute,
		onboardingRoute,
		protectedRoute,
	]);

	if (auth.isLoading) {
		return null;
	}

	const router = createRouter({
		routeTree,
		context: {
			isAuthenticated: auth.isAuthenticated,
			isLoading: auth.isLoading,
		},
	});

	return <RouterProvider router={router} />;
};