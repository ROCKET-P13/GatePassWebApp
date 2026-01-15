import { alpha } from '@mui/material/styles';
import { gray, brand } from '../../theme';

export const inputsCustomizations = {
	MuiInputBase: {
		styleOverrides: {
			root: () => ({
				backgroundColor: alpha(gray[700], 0.2),
			}),
		},
	},
	MuiButtonBase: {
		defaultProps: {
			disableTouchRipple: true,
			disableRipple: true,
		},
		styleOverrides: {
			root: ({ theme }) => ({
				boxSizing: 'border-box',
				transition: 'all 100ms ease-in',
				'&:focus-visible': {
					outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
					outlineOffset: '2px',
				},
			}),
		},
	},
	MuiButton: {
		styleOverrides: {
			root: ({ theme }) => ({
				boxShadow: 'none',
				borderRadius: (theme.vars || theme).shape.borderRadius,
				textTransform: 'none',
				fontWeight: 600,
				variants: [
					{
						props: {
							size: 'small',
						},
						style: {
							height: '2.25rem',
							padding: '8px 12px',
						},
					},
					{
						props: {
							size: 'medium',
						},
						style: {
							height: '2.5rem',
						},
					},
					{
						props: {
							color: 'primary',
							variant: 'contained',
						},
						style: {
							color: theme.palette.text.primary,
							'&:disabled': {
								backgroundColor: alpha(gray[600], 0.3),
								color: alpha(gray[300], 0.3),
							},
						},
					},
					{
						props: {
							variant: 'outlined',
						},
						style: {
							color: (theme.vars || theme).palette.text.primary,
							border: '1px solid',
							backgroundColor: gray[800],
							borderColor: gray[700],
							'&:hover': {
								backgroundColor: gray[900],
								borderColor: gray[600],
							},
							'&:active': {
								backgroundColor: gray[900],
							},
						},
					},
					{
						props: {
							color: 'secondary',
							variant: 'outlined',
						},
						style: {
							color: gray[400],
							border: 'none',
							backgroundColor: alpha(brand[900], 0.3),
							'&:hover': {
								borderColor: brand[700],
								backgroundColor: alpha(brand[900], 0.6),
							},
							'&:active': {
								backgroundColor: alpha(brand[900], 0.5),
							},
						},
					},
					{
						props: {
							variant: 'text',
						},
						style: {
							color: gray[600],
							'&:hover': {
								backgroundColor: gray[100],
							},
							'&:active': {
								backgroundColor: gray[200],
							},
							...theme.applyStyles('dark', {
								color: gray[50],
								'&:hover': {
									backgroundColor: gray[700],
								},
								'&:active': {
									backgroundColor: alpha(gray[700], 0.7),
								},
							}),
						},
					},
					{
						props: {
							color: 'secondary',
							variant: 'text',
						},
						style: {
							color: brand[100],
							'&:hover': {
								backgroundColor: alpha(brand[900], 0.5),
							},
							'&:active': {
								backgroundColor: alpha(brand[900], 0.3),
							},
						},
					},
				],
			}),
		},
	},
	MuiSwitch: {
		styleOverrides: {
			switchBase: () => ({
				transitionDuration: '200ms',
				'&.Mui-checked': {
					color: gray[50],
					'& + .MuiSwitch-track': {
						backgroundColor: brand[500],
						opacity: 1,
						border: 0,
					},
				},
				'&.Mui-disabled': {
					'& + .MuiSwitch-track': {
						opacity: 0.4,
					},
				},
			}),
			thumb: {
				width: 20,
				height: 20,
				boxSizing: 'border-box',
			},
			track: () => ({
				borderRadius: 13,
				backgroundColor: gray[700],
				opacity: 1,
			}),
		},
	},

};
