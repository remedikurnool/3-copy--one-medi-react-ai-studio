import { create } from 'zustand';

interface UIState {
    isServiceDrawerOpen: boolean;
    openServiceDrawer: () => void;
    closeServiceDrawer: () => void;
    toggleServiceDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isServiceDrawerOpen: false,
    openServiceDrawer: () => set({ isServiceDrawerOpen: true }),
    closeServiceDrawer: () => set({ isServiceDrawerOpen: false }),
    toggleServiceDrawer: () => set((state) => ({ isServiceDrawerOpen: !state.isServiceDrawerOpen })),
}));
