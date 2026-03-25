import { CardDescription, CardHeader, CardTitle } from '@ui/Card';

import { WidgetCard } from '@/Components/Dashboard/Widgets/WidgetCard';
import { useGetUserVenueQuery } from '@/hooks/queries/useGetUserVenueQuery';

export const StatusWidget = () => {
	const {
		data: venue,
		isLoading,
	} = useGetUserVenueQuery({ queryKey: ['currentUser'] });

	return (
		<WidgetCard>
			<CardHeader>
				<CardTitle className="font-medium">
					{
						isLoading
							? 'Loading...'
							: venue?.name
					}
				</CardTitle>
				{
					isLoading
						? <></>
						: (
							<CardDescription>
								{`${venue?.city}, ${venue?.state} ${venue?.country}`}
							</CardDescription>
						)
				}
			</CardHeader>

		</WidgetCard>
	);
};
