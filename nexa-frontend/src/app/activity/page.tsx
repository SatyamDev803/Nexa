"use client"

import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, DollarSign, Clock, ExternalLink } from "lucide-react"
import { Header } from "@/components/Header"

const activities = [
  {
    id: "1",
    type: "deposit",
    action: "Deposited",
    amount: "$1,000 USDC",
    pool: "Stable Yield Pool",
    time: "2 hours ago",
    status: "completed",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    icon: ArrowDownLeft,
    color: "text-green-500",
  },
  {
    id: "2",
    type: "reward",
    action: "Claimed Rewards",
    amount: "$47.32",
    pool: "ETH Staking",
    time: "1 day ago",
    status: "completed",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    icon: DollarSign,
    color: "text-primary",
  },
  {
    id: "3",
    type: "withdraw",
    action: "Withdrew",
    amount: "$500 USDT",
    pool: "DeFi Index",
    time: "3 days ago",
    status: "completed",
    txHash: "0x567890abcdef1234567890abcdef1234567890ab",
    icon: ArrowUpRight,
    color: "text-orange-500",
  },
  {
    id: "4",
    type: "deposit",
    action: "Deposited",
    amount: "$2,500 USDC",
    pool: "Basis Traded LBTC",
    time: "1 week ago",
    status: "completed",
    txHash: "0xcdef1234567890abcdef1234567890abcdef1234",
    icon: ArrowDownLeft,
    color: "text-green-500",
  },
  {
    id: "5",
    type: "reward",
    action: "Auto-Compounded",
    amount: "$123.45",
    pool: "rsweETH Harvest",
    time: "1 week ago",
    status: "completed",
    txHash: "0xef1234567890abcdef1234567890abcdef123456",
    icon: TrendingUp,
    color: "text-blue-500",
  },
]

const stats = [
  {
    title: "Total Transactions",
    value: "47",
    change: "+12 this month",
    icon: Clock,
  },
  {
    title: "Total Volume",
    value: "$18,263.89",
    change: "+$2,847.32",
    icon: DollarSign,
  },
  {
    title: "Rewards Claimed",
    value: "$1,247.83",
    change: "+$347.21",
    icon: TrendingUp,
  },
]

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Activity</h1>
          <p className="text-muted-foreground">Track all your DeFi transactions and portfolio activities.</p>
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

        {/* Activity List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-primary font-semibold">{activity.amount}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.pool} • {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                        {activity.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      <AIAssistantButton />
    </div>
  )
}
