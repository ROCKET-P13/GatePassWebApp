import { Box, CircularProgress, Typography } from '@mui/material';

export const AppLoadingScreen = ({ message = 'Loading...' }) => {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				width: '100vw',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}
		>
			<CircularProgress size={48} thickness={4} />
			<Typography
				variant="h6"
				sx={{ mt: 2, color: 'text.secondary' }}
			>
				{message}
			</Typography>
		</Box>
	);
};