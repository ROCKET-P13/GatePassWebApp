import { useNavigate } from '@tanstack/react-router';
import { Routes } from '../../../Common/routes';
import { Button } from '../../ui/Button';

export const CompleteStep = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<h2 className="text-2xl font-semibold tracking-tight">
        		🎉 Your venue is live!
			</h2>

			<p className="text-sm text-[rgb(var(--muted-foreground))] max-w-md">
        		Share your GatePass link or start checking in users.
			</p>

			<Button
				onClick={() => navigate({ to: Routes.DASHBOARD })}
			>
        		Go to Dashboard
			</Button>
		</div>
	);
};