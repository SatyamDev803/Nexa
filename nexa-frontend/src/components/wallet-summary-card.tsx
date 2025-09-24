"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, AlertCircle } from "lucide-react"
import { useWallet } from "./providers/AppProviders" // 1. Import our custom hook

export function WalletSummaryCard() {
  // 2. Get the live wallet status and account ID
  const { isConnected, accountId } = useWallet()

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Wallet Summary</CardTitle>
          {/* 3. Display the badge based on connection status */}
          {isConnected ? (
            <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
              Connected
            </Badge>
          ) : (
            <Badge variant="destructive">Not Connected</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 4. Conditionally render content: show details if connected, or a message if not */}
        {isConnected && accountId ? (
          <>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Address:</span>
                {/* 5. Display the real account ID */}
                <span className="font-mono text-sm">{accountId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Balance</div>
                <div className="text-2xl font-bold">$18,263.89</div>
                <div className="text-sm text-green-500">+$1,234.56 (7.2%)</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Available</div>
                <div className="text-2xl font-bold">$3,847.21</div>
                <div className="text-sm text-muted-foreground">Ready to invest</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Deposit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Transfer
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-1">Wallet Not Connected</h3>
            <p className="text-sm text-muted-foreground">Please connect your wallet to view your summary.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}