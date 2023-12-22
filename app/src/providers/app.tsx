import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { queryClient } from '@/lib/react-query';
import { Notifications } from '@/components/Notifications';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { arbitrum, mainnet } from 'viem/chains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'ef576a289f44b88a9108b0f906bcc7f7';

// 2. Create wagmiConfig
const metadata = {
  name: 'VADEE',
  description: 'VADEE',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });


type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center transition-all duration-500 ease-in-out">
          Loading...
        </div>
      }
    >
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
          <Notifications />
          {children}
        </QueryClientProvider>
      </WagmiConfig>
    </React.Suspense>

  );
};
