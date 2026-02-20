import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@mui/material';
import { WidgetCard } from '../WidgetCard';
import { UsersAPI } from '../../../../API/UsersAPI';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

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
			<Box>
				<Typography variant='h5'>
					{
						isLoading
							? 'Loading...'
							: venue.name
					}
				</Typography>
				{
					isLoading
						? <></>
						: (
							<Typography variant='subtitle2'>
								{`${venue.city}, ${venue.state} ${venue.country}`}
							</Typography>
						)
				}
			</Box>
		</WidgetCard>
	);
};
