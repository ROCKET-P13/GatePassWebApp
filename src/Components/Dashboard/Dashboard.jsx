import _ from 'lodash';
import { widgetRegistry } from './Widgets';

export const Dashboard = () => {
	return (
		<div
			className='grid grid-cols-12 gap-3'
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
