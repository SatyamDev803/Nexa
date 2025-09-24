"use client"

import { useState } from "react"
import { PortfolioChart } from "@/components/portfolio-chart"
import { InvestmentCards } from "@/components/investment-cards"
import { EarningsProjection } from "@/components/earnings-projection"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Target, Activity, Calendar } from "lucide-react"
import { Header } from "@/components/Header"

const portfolioStats = [
  {
    title: "Total Portfolio Value",
    value: "$18,263.89",
    change: "+$2,847.32 (18.5%)",
    icon: DollarSign,
    positive: true,
  },
  {
    title: "Active Investments",
    value: "7",
    change: "+2 this month",
    icon: Target,
    positive: true,
  },
  {
    title: "Monthly Earnings",
    value: "$1,247.83",
    change: "+$347.21 (38.6%)",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Avg. APY",
    value: "19.2%",
    change: "+2.4%",
    icon: Activity,
    positive: true,
  },
]

const timeframes = [
  { label: "7D", value: "7d" as const },
  { label: "30D", value: "30d" as const },
  { label: "90D", value: "90d" as const },
  { label: "1Y", value: "1y" as const },
]

export default function PortfolioPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Investment Portfolio</h1>
            <div className="flex items-center gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe.value}
                  variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={selectedTimeframe !== timeframe.value ? "bg-transparent" : ""}
                >
                  {timeframe.label}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">Track your DeFi investments and optimize your returns.</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.positive ? "text-green-500" : "text-red-500"}`}>{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Portfolio Chart */}
        <div className="mb-8">
          <PortfolioChart timeframe={selectedTimeframe} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Active Investments</h2>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  7 Positions
                </Badge>
              </div>
              <InvestmentCards />
            </div>
          </div>

          <div>
            <EarningsProjection />
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>Explore New Pools</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <DollarSign className="h-6 w-6" />
                <span>Claim All Rewards</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Target className="h-6 w-6" />
                <span>Rebalance Portfolio</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <AIAssistantButton />
    </div>
  )
}
