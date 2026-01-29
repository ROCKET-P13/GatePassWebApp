import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Routes } from '../../Common/routes';

export const AccountPage = () => {
	const { user, isLoading, logout } = useAuth0();

	if (isLoading) {
		return <Typography>Loading Account...</Typography>;
	}

	if (!user) {
		return <Typography>No user found.</Typography>;
	}

	return (
		<Box>
			<Typography variant="h4" mb={3}>Account</Typography>
			<Paper sx={{ p: 3 }}>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="center"
				>
					<Avatar
						src={user.picture}
						alt={user.name}
						sx={{ width: 64, height: 64 }}
					/>
					<Box>
						<Typography variant="h6">{user.name}</Typography>
						<Typography color="text.secondary">{user.email}</Typography>
					</Box>
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => logout({ logoutParams: { returnTo: Routes.LOGIN } })}
					>
					Logout
					</Button>
				</Stack>

			</Paper>
		</Box>
	);
};