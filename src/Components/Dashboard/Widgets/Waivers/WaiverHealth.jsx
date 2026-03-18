import { WidgetCard } from '@/Components/Dashboard/Widgets/WidgetCard';

export const WaiverHealthWidget = () => {
	const signed = 124;
	const total = 128;
	const percent = Math.round((signed / total) * 100);

	return (
		<WidgetCard title="Waiver Health">
			<div className="space-y-3">
				{/* Stats */}
				<h3 className="text-lg font-semibold">
					{signed} / {total} signed
				</h3>

				<div className="w-full h-3 bg-muted rounded-full overflow-hidden">
					<div
						className="h-full bg-primary transition-all duration-500"
						style={{ width: `${percent}%` }}
					/>
				</div>

				<p className="text-xs text-muted-foreground">
					{percent}% complete
				</p>
			</div>
		</WidgetCard>
	);
};