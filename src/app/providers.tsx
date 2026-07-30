import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { store } from '../store/store';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                background: 'green',
                color: '#fff',
                width: '150px',
                height: '100px',
                borderRadius: '8px',
              },
            },
            error: {
              style: {
                background: 'red',
                color: '#fff',
                width: '150px',
                height: '100px',
                borderRadius: '8px',
              },
            },
          }}
        />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
};
