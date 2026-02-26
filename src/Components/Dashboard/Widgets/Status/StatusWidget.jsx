import { useAuth0 } from '@auth0/auth0-react';
import { WidgetCard } from '../WidgetCard';
import { UsersAPI } from '../../../../API/UsersAPI';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CardDescription, CardHeader, CardTitle } from '../../../ui/Card';

export const StatusWidget = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();
	const usersAPI = useMemo(
		() => new UsersAPI({ getAccessToken: getAccessTokenSilently }),
		[getAccessTokenSilently]
	);

	const { data: venue, isLoading } = useQuery({
		queryKey: ['currentUser'],
		queryFn: () => usersAPI.getVenue(),
		enabled: isAuthenticated,
		keepPreviousData: true,
	});

	return (
		<WidgetCard>
			<CardHeader>
				<CardTitle>
					{
						isLoading
							? 'Loading...'
							: venue.name
					}
				</CardTitle>
				{
					isLoading
						? <></>
						: (
							<CardDescription variant='subtitle2'>
								{`${venue.city}, ${venue.state} ${venue.country}`}
							</CardDescription>
						)
				}
			</CardHeader>

		</WidgetCard>
	);
};
