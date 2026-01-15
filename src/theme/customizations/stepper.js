import { alpha } from '@mui/material';

export const stepperCustomizations = {
	MuiStepLabel: {
		styleOverrides: {
			label: ({ theme }) => ({
				fontSize: '12px',
				transition: 'color 150ms ease',
				'&.Mui-active': {
					fontWeight: 500,
					color: theme.palette.text.primary,
				},
				'&.Mui-completed': {
					color: theme.palette.text.secondary,
				},
			}),
		},
	},
	MuiStepIcon: {
		styleOverrides: {
			root: ({ theme }) => ({
				color: alpha(theme.palette.grey[600], 0.2),
				'&.Mui-active': {
					color: theme.palette.primary.main,
				},
				'&.Mui-completed': {
					color: theme.palette.success.main,
				},
			}),
		},
	},
};