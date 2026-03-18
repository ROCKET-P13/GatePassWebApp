import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from '@tanstack/react-router';

import { Routes } from '@/Common/routes';

import { Button } from '@ui/Button';

export const LoginPage = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	if (isAuthenticated) {
		return <Navigate to={Routes.DASHBOARD} replace />;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background px-4">
			<div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-lg p-8">
				<div className="flex flex-col items-center space-y-6 text-center">

					<h1 className="text-3xl font-semibold tracking-tight">
						GatePass
					</h1>

					<p className="text-sm text-muted-foreground">
						Sign in to manage events, participants, and venues.
					</p>

					<Button
						className="w-full"
						size="lg"
						onClick={loginWithRedirect}
					>
						Log In
					</Button>

				</div>
			</div>
		</div>
	);
};