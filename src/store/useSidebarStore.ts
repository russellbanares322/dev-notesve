import { create } from 'zustand';

type SidebarStore = {
    isSidebarCollapsed: boolean,
    toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    isSidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({isSidebarCollapsed: !state.isSidebarCollapsed}))
}))

