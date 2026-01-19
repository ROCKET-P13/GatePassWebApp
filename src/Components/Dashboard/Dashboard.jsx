import _ from 'lodash';
import { Box } from '@mui/material';
import { widgetRegistry } from './Widgets';

export const Dashboard = () => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(12, 1fr)',
				gap: 2,
			}}
		>
			{
				_.chain(widgetRegistry)
					.entries()
					.map(([key, { component: Widget, w }]) => (
						<Box key={key} sx={{ gridColumn: `span ${w}` }}>
							<Widget />
						</Box>
					))
					.value()
			}

		</Box>
	);
};
