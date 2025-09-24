import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Deposited",
    value: "$17,987,451",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Active Positions",
    value: "7",
    change: "+2 this week",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "Total Earnings",
    value: "$2,847.32",
    change: "+$247.18",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Avg APY",
    value: "18.4%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Activity,
  },
]

export function StatsCards() {
  return (
    <>
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
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
