import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from '@tanstack/react-router';
import { Routes } from '../../Common/routes';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

export const LoginPage = () => {
	const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return null;
	}

	if (isAuthenticated) {
		return <Navigate to={Routes.DASHBOARD} replace />;
	}

	return (
		    <Box
			minHeight="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Paper elevation={3} sx={{ p: 4, width: 500 }}>
				<Stack spacing={3} alignItems="center">
					<Typography variant="h4" fontWeight={600}>
						GatePass
					</Typography>

					<Typography variant="body1" color="text.secondary" align="center">
						Sign in to manage events, people, and venues.
					</Typography>

					<Button
						fullWidth
						size="large"
						variant="contained"
						onClick={() => loginWithRedirect()}
					>
						Log In
					</Button>
				</Stack>
			</Paper>
		</Box>
	);
};