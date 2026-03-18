import { WidgetCard } from '@/Components/Dashboard/Widgets/WidgetCard';

export const RevenueWidget = () => {
	return (
		<WidgetCard title="Revenue Today">
			<div>
				<h1 className="text-3xl">$3,420</h1>
				<p className="text-muted-foreground">Across all events</p>
			</div>
		</WidgetCard>
	);
};
