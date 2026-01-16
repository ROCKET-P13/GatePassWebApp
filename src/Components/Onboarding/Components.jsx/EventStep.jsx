import { Button, Stack, TextField } from '@mui/material';
import { useOnboardingStore } from '../../../store/useOnboardingStore';
import { DateTimePicker } from '@mui/x-date-pickers';

export const EventStep = () => {
	const next = useOnboardingStore((state) => state.next);
	const back = useOnboardingStore((state) => state.back);

	return (
		    <Stack spacing={3}>
			<TextField label="Event Name" fullWidth />
			<DateTimePicker label='Event Date' />
			<Stack direction="row" spacing={2}>
				<Button variant='outlined'color='secondary' onClick={back}>Back</Button>
				<Button variant='contained' onClick={next}>
					Go Live
				</Button>
			</Stack>
		</Stack>
	);
};