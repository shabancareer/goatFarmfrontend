import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface OrganizationInfo {
  id: string;
  name: string;
  slug?: string;
  logoUrl?: string | null;
}

interface OrganizationState {
  currentOrganization: OrganizationInfo | null;
  organizations: OrganizationInfo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getSavedOrganization = (): OrganizationInfo | null => {
  try {
    const saved = localStorage.getItem('activeOrganization');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const initialState: OrganizationState = {
  currentOrganization: getSavedOrganization(),
  organizations: [],
  status: 'idle',
  error: null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setCurrentOrganization(state, action: PayloadAction<OrganizationInfo | null>) {
      state.currentOrganization = action.payload;
      if (action.payload) {
        localStorage.setItem('activeOrganization', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('activeOrganization');
      }
    },
    setOrganizations(state, action: PayloadAction<OrganizationInfo[]>) {
      state.organizations = action.payload;
    },
    clearOrganizationState(state) {
      state.currentOrganization = null;
      state.organizations = [];
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('activeOrganization');
    },
  },
});

export const {
  setCurrentOrganization,
  setOrganizations,
  clearOrganizationState,
} = organizationSlice.actions;

export default organizationSlice.reducer;
