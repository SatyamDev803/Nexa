"use client"

import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, DollarSign, TrendingUp, Zap } from "lucide-react"
import { Header } from "@/components/Header"

const rewardPools = [
  {
    id: "1",
    name: "Stable Yield Pool",
    earned: "$47.32",
    pending: "$12.45",
    apy: "18.4%",
    nextClaim: "2 days",
    canClaim: false, 
  },
  {
    id: "2",
    name: "ETH Staking",
    earned: "$123.67",
    pending: "$34.21",
    apy: "21.7%",
    nextClaim: "Ready",
    canClaim: true,
  },
  {
    id: "3",
    name: "BTC Yield Strategy",
    earned: "$89.45",
    pending: "$23.12",
    apy: "15.2%",
    nextClaim: "5 days",
    canClaim: false,
  },
]

const loyaltyProgram = {
  currentTier: "Gold",
  nextTier: "Platinum",
  progress: 75,
  benefits: ["1.5x reward multiplier", "Priority customer support", "Early access to new pools"],
  nextBenefits: ["2x reward multiplier", "Exclusive investment opportunities", "Personal portfolio manager"],
}

const stats = [
  {
    title: "Total Rewards Earned",
    value: "$1,247.83",
    change: "+$347.21 this month",
    icon: DollarSign,
  },
  {
    title: "Pending Rewards",
    value: "$69.78",
    change: "Ready to claim",
    icon: Gift,
  },
  {
    title: "Avg. Monthly Yield",
    value: "19.2%",
    change: "+2.4% vs last month",
    icon: TrendingUp,
  },
]

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rewards</h1>
          <p className="text-muted-foreground">
            Track and claim your DeFi rewards across all pools and staking positions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reward Pools */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Active Reward Pools</CardTitle>
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Claim All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rewardPools.map((pool) => (
                    <div key={pool.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{pool.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>APY: {pool.apy}</span>
                            <span>•</span>
                            <span>Next claim: {pool.nextClaim}</span>
                          </div>
                        </div>
                        <Button size="sm" disabled={!pool.canClaim} variant={pool.canClaim ? "default" : "outline"}>
                          {pool.canClaim ? "Claim" : "Pending"}
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Total Earned</div>
                          <div className="font-semibold text-green-500">{pool.earned}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Pending</div>
                          <div className="font-semibold text-primary">{pool.pending}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loyalty Program */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Loyalty Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Tier</span>
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                      {loyaltyProgram.currentTier}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to {loyaltyProgram.nextTier}</span>
                      <span>{loyaltyProgram.progress}%</span>
                    </div>
                    <Progress value={loyaltyProgram.progress} className="h-2" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Current Benefits</h4>
                  <ul className="space-y-1">
                    {loyaltyProgram.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Next Tier Benefits</h4>
                  <ul className="space-y-1">
                    {loyaltyProgram.nextBenefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <AIAssistantButton />
    </div>
  )
}
