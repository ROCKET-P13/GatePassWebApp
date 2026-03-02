import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const AccountPage = () => {
	const { user, isLoading, logout } = useAuth0();

	if (isLoading) {
		return <h2>Loading Account...</h2>;
	}

	if (!user) {
		return <h2>No user found.</h2>;
	}

	return (
		<div className='flex flex-col items-center space-y-6 p-3'>
			<Avatar
				src={user.picture}
				name={user.name}
				size="lg"
			/>
			<div className='text-center'>
				<h2 className='text-xl font-semibold'>{user.name}</h2>
				<p className="text-sm text-muted-foreground">{user.email}</p>
			</div>
			<Button
				variant='outline'
				onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
			>
				Logout
			</Button>
		</div>
	);
};