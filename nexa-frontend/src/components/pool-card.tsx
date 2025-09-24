"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, AlertTriangle, Info } from "lucide-react"

interface Pool {
  id: string
  name: string
  tokens: string[]
  apy: string
  tvl: string
  risk: "Low" | "Medium" | "High"
  strategy: string
  description: string
  minDeposit: string
  lockPeriod?: string
}

interface PoolCardProps {
  pool: Pool
  onDeposit: (poolId: string) => void
}

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "Low":
      return <Shield className="h-4 w-4 text-green-500" />
    case "Medium":
      return <Info className="h-4 w-4 text-yellow-500" />
    case "High":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    default:
      return <Info className="h-4 w-4" />
  }
}

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

const getStrategyColor = (strategy: string) => {
  switch (strategy) {
    case "Bullish BTC":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    case "Trending ETH":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "Limited Downside":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "Stable Yield":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function PoolCard({ pool, onDeposit }: PoolCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{pool.name}</h3>
              <div className="flex items-center gap-2">
                {pool.tokens.map((token, index) => (
                  <span key={token} className="text-sm text-muted-foreground">
                    {token}
                    {index < pool.tokens.length - 1 && " + "}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{pool.apy}</div>
              <div className="text-sm text-muted-foreground">Est. APY</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground">{pool.description}</p>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={getRiskColor(pool.risk)}>
              {getRiskIcon(pool.risk)}
              <span className="ml-1">{pool.risk} Risk</span>
            </Badge>
            <Badge variant="outline" className={getStrategyColor(pool.strategy)}>
              {pool.strategy}
            </Badge>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-3 border-t border-border/40">
            <div>
              <div className="text-sm text-muted-foreground">TVL</div>
              <div className="font-semibold">{pool.tvl}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Min. Deposit</div>
              <div className="font-semibold">{pool.minDeposit}</div>
            </div>
          </div>

          {/* {pool.lockPeriod && <div className="text-sm text-muted-foreground">Lock Period: {pool.lockPeriod}</div>} */}

          {/* Action Button */}
          <Button onClick={() => onDeposit(pool.id)} className="w-full">
            <TrendingUp className="mr-2 h-4 w-4" />
            Deposit Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
