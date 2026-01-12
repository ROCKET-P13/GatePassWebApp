import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import theme from './theme';

import { router } from './router';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<RouterProvider router={router} />
			</LocalizationProvider>
		</ThemeProvider>
	</StrictMode>
);