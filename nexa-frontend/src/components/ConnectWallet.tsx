// src/components/ConnectWallet.tsx
'use client';

import { useWallet } from './providers/AppProviders';
import { Button } from './ui/button';
import { Wallet, LogOut } from 'lucide-react';

export function ConnectWallet() {
  const { modal, accountId, selector } = useWallet();

  const handleConnect = () => {
    if (modal) {
      modal.show();
    }
  };

  const handleDisconnect = async () => {
    if (!selector) return;
    const wallet = await selector.wallet();
    if (wallet) {
      await wallet.signOut();
    }
  };

  if (accountId) {
    const displayAddress = `${accountId.slice(0, 6)}...${accountId.slice(-10)}`;

    return (
      <div className="flex items-center gap-3">
        <p className="text-sm font-mono bg-muted px-3 py-2 rounded-md">{displayAddress}</p>
        <Button onClick={handleDisconnect} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnect}>
      <Wallet className="mr-2 h-5 w-5" />
      Connect Wallet
    </Button>
  );
}