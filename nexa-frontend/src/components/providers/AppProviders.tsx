// src/components/providers/AppProviders.tsx
'use client';

import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { type AccountState, setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupWalletConnect } from '@near-wallet-selector/wallet-connect';
import { setupSender } from '@near-wallet-selector/sender';
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import type { WalletSelector } from '@near-wallet-selector/core';

import '@near-wallet-selector/modal-ui/styles.css';

interface WalletContextType {
  selector: WalletSelector | null;
  modal: WalletSelectorModal | null;
  accounts: AccountState[];
  accountId: string | null;
  isConnected: boolean; // <-- 1. ADD isConnected TO THE TYPE
}

const WalletContext = createContext<WalletContextType | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<AccountState[]>([]);

  useEffect(() => {
    const initializeSelector = async () => {
      const _selector = await setupWalletSelector({
        network: 'mainnet',
        modules: [
          setupSender(),
          setupWalletConnect({
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
            metadata: {
              name: 'Nexa Finance',
              description: 'Multi-chain yield aggregator',
              url: window.location.origin,
              icons: ['https://avatars.githubusercontent.com/u/37784886'],
            },
          }),
        ],
      });

      const _modal = setupModal(_selector, {
        contractId: 'guest-book.near',
      });

      const state = _selector.store.getState();
      setAccounts(state.accounts);

      const handleStateChange = () => {
        setAccounts(_selector.store.getState().accounts);
      };

      _selector.on('signedIn', handleStateChange);
      _selector.on('signedOut', handleStateChange);
      _selector.on('accountsChanged', handleStateChange);
      
      setSelector(_selector);
      setModal(_modal);

      return () => {
        _selector.off('signedIn', handleStateChange);
        _selector.off('signedOut', handleStateChange);
        _selector.off('accountsChanged', handleStateChange);
      };
    };

    initializeSelector();
  }, []);

  const accountId = accounts.find((account) => account.active)?.accountId || null;
  const isConnected = !!accountId;

  return (
    <WalletContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
        isConnected, // <-- 2. PASS isConnected TO THE PROVIDER
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}