import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from '@tanstack/react-router';
import { Routes } from '../Common/routes';

export const RequireAuth = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to={Routes.LOGIN} />;
	}

	return <Outlet />;
};