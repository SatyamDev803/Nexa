// src/components/staking-actions.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner" // <-- IMPORT FROM SONNER
import { TrendingUp, TrendingDown, Gift, Wallet } from "lucide-react"

export function StakingActions() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  // const { toast } = useToast() // <-- REMOVE OLD HOOK

  const stakedBalance = "12,847.32"
  const availableBalance = "3,247.89"
  const pendingRewards = "247.83"
  const tokenSymbol = "DVT"

  const handleStake = () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) return

    // USE NEW TOAST FUNCTION
    toast.info("Staking Initiated", {
      description: `Staking ${stakeAmount} ${tokenSymbol} tokens`,
    })
    setStakeAmount("")
  }

  const handleUnstake = () => {
    if (!unstakeAmount || Number.parseFloat(unstakeAmount) <= 0) return

    // USE NEW TOAST FUNCTION
    toast.info("Unstaking Initiated", {
      description: `Unstaking ${unstakeAmount} ${tokenSymbol} tokens`,
    })
    setUnstakeAmount("")
  }

  const handleClaimRewards = () => {
    // USE NEW TOAST FUNCTION
    toast.success("Rewards Claimed", {
      description: `Claimed ${pendingRewards} ${tokenSymbol} in rewards`,
    })
  }

  // ... (JSX is the same, no changes needed there)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Staking Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Staked Balance</div>
              <div className="text-2xl font-bold">
                {stakedBalance} {tokenSymbol}
              </div>
              <div className="text-sm text-green-500">+12.4% this month</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Available Balance</div>
              <div className="text-2xl font-bold">
                {availableBalance} {tokenSymbol}
              </div>
              <div className="text-sm text-muted-foreground">Ready to stake</div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Pending Rewards</div>
                <div className="text-sm text-muted-foreground">Ready to claim</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {pendingRewards} {tokenSymbol}
              </div>
              <Button size="sm" onClick={handleClaimRewards} className="mt-1">
                Claim
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Stake Tokens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount to Stake</span>
                <span className="text-muted-foreground">
                  Available: {availableBalance} {tokenSymbol}
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="pr-20"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStakeAmount(availableBalance.replace(",", ""))}
                    className="h-6 px-2 text-xs"
                  >
                    MAX
                  </Button>
                  <span className="text-sm text-muted-foreground">{tokenSymbol}</span>
                </div>
              </div>
            </div>

            {stakeAmount && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Monthly Rewards</span>
                  <span className="font-medium text-primary">
                    +{(Number.parseFloat(stakeAmount) * 0.02).toFixed(2)} {tokenSymbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lock Period</span>
                  <span>30 days minimum</span>
                </div>
              </div>
            )}

            <Button onClick={handleStake} className="w-full" disabled={!stakeAmount}>
              <Wallet className="mr-2 h-4 w-4" />
              Stake Tokens
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-500" />
              Unstake Tokens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount to Unstake</span>
                <span className="text-muted-foreground">
                  Staked: {stakedBalance} {tokenSymbol}
                </span>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                  className="pr-20"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUnstakeAmount(stakedBalance.replace(",", ""))}
                    className="h-6 px-2 text-xs"
                  >
                    MAX
                  </Button>
                  <span className="text-sm text-muted-foreground">{tokenSymbol}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">Unstaking Notice</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Unstaking has a 7-day cooldown period. Rewards will stop accruing immediately.
              </p>
            </div>

            <Button
              onClick={handleUnstake}
              variant="outline"
              className="w-full bg-transparent"
              disabled={!unstakeAmount}
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              Unstake Tokens
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}