import { create } from 'zustand';

export const dashboardStore = create((set) => ({
	drawerOpen: false,
	toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
}));