import { Button, Stack, Typography } from '@mui/material';
import { useOnboardingStore } from '../../../store/useOnboardingStore';

export const WaiverStep = () => {
	const next = useOnboardingStore((state) => state.next);
	const back = useOnboardingStore((state) => state.back);

	return (
		<Stack spacing={3}>
			<Typography>
				Upload your existing waiver or use our default template.
			</Typography>

			<Button variant='outlined'>
				Upload PDF
			</Button>

			<Stack direction='row' spacing={2}>
				<Button variant='contained' onClick={back}>Back</Button>
				<Button variant='contained' onClick={next}>Continue</Button>
			</Stack>
		</Stack>
	);
};