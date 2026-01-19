import _ from 'lodash';
import { Box, Card, CardContent, Typography } from '@mui/material';

export const WidgetCard = ({ title, action, children }) => {
	return (
		<Card sx={{ height: '100%', padding: 2 }}>
			{
				_.some(title)
					? <Box sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
						<Typography variant='h5'>{title}</Typography>
						{action}
					</Box>
					: <></>
			}
			<CardContent>
				{children}
			</CardContent>
		</Card>
	);
};