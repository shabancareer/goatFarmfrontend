import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
  isCollapsed: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    toggleSidebarCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.isCollapsed = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapse,
  setSidebarCollapsed,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
