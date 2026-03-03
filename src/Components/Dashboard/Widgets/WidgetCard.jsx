import { Card, CardContent } from '../../ui/Card';

export const WidgetCard = ({ title, action, children }) => {
	const hasTitle = !!title;

	return (
		<Card className="h-full p-2">
			{
				hasTitle && (
					<div className="flex items-center justify-between px-4 py-2">
						<h3 className="text-lg tracking-tight">
							{title}
						</h3>
						{action}
					</div>
				)
			}

			<CardContent>
				{children}
			</CardContent>
		</Card>
	);
};