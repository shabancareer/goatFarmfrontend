import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  activeFilters: Record<string, unknown>;
}

const initialState: FilterState = {
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  activeFilters: {},
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSorting(
      state,
      action: PayloadAction<{ sortBy: string; sortOrder?: 'asc' | 'desc' }>,
    ) {
      state.sortBy = action.payload.sortBy;
      if (action.payload.sortOrder) {
        state.sortOrder = action.payload.sortOrder;
      }
    },
    setFilter(state, action: PayloadAction<{ key: string; value: unknown }>) {
      state.activeFilters[action.payload.key] = action.payload.value;
    },
    removeFilter(state, action: PayloadAction<string>) {
      delete state.activeFilters[action.payload];
    },
    resetFilters(state) {
      state.searchQuery = '';
      state.sortBy = 'createdAt';
      state.sortOrder = 'desc';
      state.activeFilters = {};
    },
  },
});

export const {
  setSearchQuery,
  setSorting,
  setFilter,
  removeFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
