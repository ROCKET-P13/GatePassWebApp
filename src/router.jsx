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
	path: '/onboarding',
	component: VenueOnboarding,
});

const dashboardRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: Routes.DASHBOARD,
	component: () => <div>Dashboard</div>,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	onboardingRoute,
	dashboardRoute,
]);

export const router = createRouter({ routeTree });
