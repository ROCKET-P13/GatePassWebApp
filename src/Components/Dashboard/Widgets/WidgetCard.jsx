import _ from 'lodash';
import { Box, Typography } from '@mui/material';
import { Card, CardContent } from '../../UI/Card';

export const WidgetCard = ({ title, action, children }) => {
	return (
		<Card className='h-full p-2'>
			{
				_.some(title)
					? <Box sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingX: 2,
					}}>
						<Typography variant='h6'>{title}</Typography>
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