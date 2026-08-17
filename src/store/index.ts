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
  devTools: import.meta.env.DEV ? {
    maxAge: 25, // limit action history depth to conserve memory
    latency: 500,
    actionSanitizer: (action: any) => {
      // Sanitize large payloads (e.g. photos/base64, large lists)
      if (action.type?.includes('uploadPhoto') || action.type?.includes('login')) {
        return { ...action, payload: '<<LARGE_PAYLOAD_TRUNCATED>>' };
      }
      return action;
    },
    stateSanitizer: (state: any) => {
      // Truncate large state properties if needed for devtools display
      return state;
    },
  } : false,
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
