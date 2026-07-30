import { configureStore } from '@reduxjs/toolkit'
import manageGoatReducer from './slices/manageGoat/manageGoatSlice'
import authReducer from './slices/auth/auth.slice';
import { injectStore } from '../shared/api/api';

export const store = configureStore({
  reducer:
  {
    manageGoat: manageGoatReducer,
    auth: authReducer
  },
})

injectStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch