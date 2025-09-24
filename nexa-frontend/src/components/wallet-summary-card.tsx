"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Copy, ExternalLink } from "lucide-react"

export function WalletSummaryCard() {
  const walletAddress = "0x803...EH5"

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Wallet Summary</CardTitle>
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
            Connected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Address:</span>
            <span className="font-mono text-sm">{walletAddress}</span>
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
      </CardContent>
    </Card>
  )
}
