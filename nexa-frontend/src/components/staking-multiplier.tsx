"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Target } from "lucide-react"

const multipliers = [
  {
    title: "Loyalty Multiplier",
    current: 1.25,
    max: 2.0,
    progress: 62.5,
    description: "Stake longer to increase rewards",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Volume Multiplier",
    current: 1.8,
    max: 3.0,
    progress: 60,
    description: "Higher deposits unlock better rates",
    icon: Target,
    color: "text-green-500",
  },
  {
    title: "Governance Multiplier",
    current: 1.1,
    max: 1.5,
    progress: 25,
    description: "Participate in voting for bonus rewards",
    icon: Zap,
    color: "text-purple-500",
  },
]

export function StakingMultiplier() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Reward Multipliers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {multipliers.map((multiplier) => {
          const Icon = multiplier.icon
          return (
            <div key={multiplier.title} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${multiplier.color}`} />
                  <span className="font-medium text-sm">{multiplier.title}</span>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {multiplier.current}x
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{multiplier.description}</span>
                  <span>
                    {multiplier.current}x / {multiplier.max}x
                  </span>
                </div>
                <Progress value={multiplier.progress} className="h-2" />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
