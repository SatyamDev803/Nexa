"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Plus, Minus, DollarSign } from "lucide-react"

const investments = [
  {
    id: "1",
    name: "Stable Yield Pool",
    token: "USDC",
    depositAmount: 5000,
    currentValue: 5847.32,
    apy: "18.4%",
    earnings: 847.32,
    earningsPercent: 16.95,
    risk: "Low",
    timeInvested: "127 days",
  },
  {
    id: "2",
    name: "ETH Liquid Staking",
    token: "ETH",
    depositAmount: 3.5,
    currentValue: 4.23,
    apy: "22.1%",
    earnings: 0.73,
    earningsPercent: 20.86,
    risk: "Medium",
    timeInvested: "89 days",
  },
  {
    id: "3",
    name: "BTC Yield Strategy",
    token: "BTC",
    depositAmount: 0.25,
    currentValue: 0.31,
    apy: "15.7%",
    earnings: 0.06,
    earningsPercent: 24.0,
    risk: "Medium",
    timeInvested: "156 days",
  },
  {
    id: "4",
    name: "DeFi Index Fund",
    token: "USDT",
    depositAmount: 2500,
    currentValue: 2689.45,
    apy: "19.8%",
    earnings: 189.45,
    earningsPercent: 7.58,
    risk: "High",
    timeInvested: "45 days",
  },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "Medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "High":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function InvestmentCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {investments.map((investment) => (
        <Card key={investment.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{investment.name}</CardTitle>
              <Badge variant="outline" className={getRiskColor(investment.risk)}>
                {investment.risk}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{investment.token}</span>
              <span>•</span>
              <span>{investment.timeInvested}</span>
              <span>•</span>
              <span className="text-primary font-medium">{investment.apy} APY</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Deposited</div>
                <div className="font-semibold">
                  {typeof investment.depositAmount === "number" && investment.depositAmount > 100
                    ? `$${investment.depositAmount.toLocaleString()}`
                    : `${investment.depositAmount} ${investment.token}`}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Current Value</div>
                <div className="font-semibold">
                  {typeof investment.currentValue === "number" && investment.currentValue > 100
                    ? `$${investment.currentValue.toLocaleString()}`
                    : `${investment.currentValue} ${investment.token}`}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Earnings</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-500">
                    +
                    {typeof investment.earnings === "number" && investment.earnings > 100
                      ? `$${investment.earnings.toFixed(2)}`
                      : `${investment.earnings} ${investment.token}`}
                  </span>
                </div>
              </div>
              <Progress value={investment.earningsPercent} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">
                +{investment.earningsPercent.toFixed(1)}% return
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Add More
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Minus className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <DollarSign className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
