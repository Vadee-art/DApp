import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '@/lib/react-query';
import { Notifications } from '@/components/Notifications';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen transition-all duration-500 ease-in-out">
          Loading...
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
        <Notifications />
        {children}
      </QueryClientProvider>
    </React.Suspense>
  );
};
