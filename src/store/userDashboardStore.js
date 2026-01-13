import { create } from 'zustand';

export const useDashboardStore = create((set) => ({
	drawerOpen: false,
	toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
}));