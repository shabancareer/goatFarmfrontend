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

const initialState: OrganizationState = {
  currentOrganization: null,
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
    },
    setOrganizations(state, action: PayloadAction<OrganizationInfo[]>) {
      state.organizations = action.payload;
    },
    clearOrganizationState(state) {
      state.currentOrganization = null;
      state.organizations = [];
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const {
  setCurrentOrganization,
  setOrganizations,
  clearOrganizationState,
} = organizationSlice.actions;

export default organizationSlice.reducer;
