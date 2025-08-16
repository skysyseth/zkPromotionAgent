import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import type { Chain } from 'viem';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? 'default_project_id';

// 自定义 Monad Testnet
export const monadTestnetCustom: Chain = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
    public: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: 'zkPromotionAgent',
  projectId,
  chains: [monadTestnetCustom],
  transports: {
    [monadTestnetCustom.id]: http('https://testnet-rpc.monad.xyz'),
  },
});
