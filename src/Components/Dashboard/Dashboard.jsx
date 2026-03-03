import _ from 'lodash';
import { widgetRegistry } from './Widgets';

export const Dashboard = () => {
	return (
		<div
			className='grid grid-cols-12 gap-4'
		>
			{
				_.chain(widgetRegistry)
					.entries()
					.map(([key, { component: Widget, className }]) => (
						<div key={key} className={className}>
							<Widget />
						</div>

					))
					.value()
			}
		</div>
	);
};
