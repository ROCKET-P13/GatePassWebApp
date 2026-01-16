import { Typography, Button, Stack } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { Routes } from '../../../Common/routes';

export const CompleteStep = () => {
	const navigate = useNavigate();

	return (
		<Stack spacing={3} textAlign="center">
			<Typography variant="h5">
			🎉 Your venue is live!
			</Typography>
			<Typography>
				Share your GatePass link or start checking in users.
			</Typography>
			<Button
				variant="contained"
				onClick={() => navigate({ to: Routes.DASHBOARD })}
			>
				Go to Dashboard
			</Button>
		</Stack>
	);
};
