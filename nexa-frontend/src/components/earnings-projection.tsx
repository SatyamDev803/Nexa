"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Target, Zap } from "lucide-react"

const projections = [
  {
    period: "Next 30 Days",
    amount: "$347.82",
    confidence: "High",
    icon: Calendar,
  },
  {
    period: "Next 90 Days",
    amount: "$1,156.47",
    confidence: "High",
    icon: Target,
  },
  {
    period: "Next Year",
    amount: "$4,892.34",
    confidence: "Medium",
    icon: TrendingUp,
  },
]

const strategies = [
  {
    title: "Compound Rewards",
    description: "Auto-reinvest earnings for 23% higher returns",
    impact: "+$1,127/year",
    enabled: true,
  },
  {
    title: "Rebalance Portfolio",
    description: "Optimize allocation for better risk-adjusted returns",
    impact: "+$847/year",
    enabled: false,
  },
  {
    title: "Stake Governance Tokens",
    description: "Earn additional rewards through protocol participation",
    impact: "+$456/year",
    enabled: false,
  },
]

export function EarningsProjection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Earnings Projection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projections.map((projection) => {
            const Icon = projection.icon
            return (
              <div key={projection.period} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{projection.period}</div>
                    <div className="text-sm text-muted-foreground">{projection.confidence} confidence</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{projection.amount}</div>
                  <Badge
                    variant="outline"
                    className={
                      projection.confidence === "High"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }
                  >
                    {projection.confidence}
                  </Badge>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Optimization Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {strategies.map((strategy, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex-1">
                <div className="font-medium mb-1">{strategy.title}</div>
                <div className="text-sm text-muted-foreground mb-2">{strategy.description}</div>
                <div className="text-sm font-medium text-primary">{strategy.impact}</div>
              </div>
              <Button
                size="sm"
                variant={strategy.enabled ? "default" : "outline"}
                className={strategy.enabled ? "" : "bg-transparent"}
              >
                {strategy.enabled ? "Enabled" : "Enable"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
