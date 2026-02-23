import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import theme from './theme';
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
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<AppRouter />
				</LocalizationProvider>
			</ThemeProvider>
		</Auth0Provider>
	</StrictMode>
);