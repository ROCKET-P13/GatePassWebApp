import { Card, CardContent } from '@ui/Card';
import { ReactNode } from 'react';

interface WidgetCardProps {
	title?: string;
	action?: ReactNode;
	children: ReactNode;
}

export const WidgetCard = ({ title, action, children }: WidgetCardProps) => {
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
