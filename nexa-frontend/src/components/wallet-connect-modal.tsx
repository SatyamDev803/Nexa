"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ExternalLink } from "lucide-react"

const wallets = [
  {
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using browser wallet",
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    description: "Scan with mobile wallet",
  },
  {
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Connect with Coinbase",
  },
  {
    name: "Phantom",
    icon: "👻",
    description: "Solana wallet support",
  },
]

export function WalletConnectModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWalletConnect = (walletName: string) => {
    // Placeholder for wallet connection logic
    console.log(`Connecting to ${walletName}`)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl"
        >
          <Wallet className="mr-2 h-5 w-5" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {wallets.map((wallet) => (
            <Card key={wallet.name} className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-0"
                  onClick={() => handleWalletConnect(wallet.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{wallet.name}</div>
                      <div className="text-sm text-muted-foreground">{wallet.description}</div>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
