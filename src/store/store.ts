import { configureStore } from '@reduxjs/toolkit'
import manageGoatReducer from '../features/manageGoats/manageGoatSlice'
import authReducer from '../features/auth/slice/auth.slice';
import { injectStore } from '../services/api';

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