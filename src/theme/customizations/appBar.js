export const appBarCustomizations = {
	MuiAppBar: {
		styleOverrides: {
			root: ({ theme }) => ({
				borderColor: theme.palette.primary.dark,
				backgroundColor: theme.palette.background.paper,
				backgroundImage: 'none',
				top: 'var(--template-frame-height, 0px)',
				position: 'fixed',
				boxShadow: 'none',
			}),
		},
	},
};