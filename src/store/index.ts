import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/auth.slice';
import themeReducer from './theme/themeSlice';
import sidebarReducer from './sidebar/sidebarSlice';
import notificationReducer from './notifications/notificationSlice';
import organizationReducer from './organization/organizationSlice';
import filterReducer from './filters/filterSlice';
import { injectStore } from '../shared/api/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
    notifications: notificationReducer,
    organization: organizationReducer,
    filters: filterReducer,
  },
  devTools: import.meta.env.DEV,
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
