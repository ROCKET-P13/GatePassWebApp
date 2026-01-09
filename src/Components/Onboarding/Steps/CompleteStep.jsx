import { Typography, Button, Stack } from '@mui/material';

export const CompleteStep = () => {
	return (
		<Stack spacing={3} textAlign="center">
			<Typography variant="h5">
			🎉 Your venue is live!
			</Typography>
			<Typography>
				Share your GatePass link or start checking in users.
			</Typography>
			<Button variant="contained">
				Go to Dashboard
			</Button>
		</Stack>
	);
};
