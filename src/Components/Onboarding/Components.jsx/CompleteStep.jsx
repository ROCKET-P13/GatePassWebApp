import { Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { Routes } from '../../../Common/routes';
import { Button } from '../../ui/Button';

export const CompleteStep = () => {
	const navigate = useNavigate();

	return (
		<div className='flex flex-col gap-4 items-center'>
			<Typography variant="h5">
			🎉 Your venue is live!
			</Typography>
			<Typography>
				Share your GatePass link or start checking in users.
			</Typography>
			<Button
				onClick={() => navigate({ to: Routes.DASHBOARD })}
			>
				Go to Dashboard
			</Button>
		</div>
	);
};
