import { Typography } from '@mui/material';

export const Metric = ({ label, value }) => {
	return (
		<div style={{ flexDirection: 'column' }}>
			<Typography variant='caption' color='text.secondary'>
				{label}
			</Typography>
			<Typography variant='h6'>
				{value}
			</Typography>
		</div>
	);
};