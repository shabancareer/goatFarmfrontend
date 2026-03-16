import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store'
import { Provider } from 'react-redux'
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useIsFetching } from "@tanstack/react-query";
// import './index.css'
import './App.css'
import App from './App.tsx'

const queryClient = new QueryClient()
const isFetching = useIsFetching();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {isFetching > 0 && <div className="top-loader bg-red-500" />}
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)
