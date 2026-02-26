import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Auth0Provider } from '@auth0/auth0-react';
import '@fontsource/inter';
import './index.css';
import { AppRouter } from './AppRouter';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Auth0Provider
			domain={import.meta.env.VITE_AUTH0_DOMAIN}
			clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: import.meta.env.VITE_AUTH0_AUDIENCE,
				scope: 'openid profile email offline_access',
			}}
			cacheLocation="localstorage"
			useRefreshTokens
		>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<AppRouter />
			</LocalizationProvider>
		</Auth0Provider>
	</StrictMode>
);