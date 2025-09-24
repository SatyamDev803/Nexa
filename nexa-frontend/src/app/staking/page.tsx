import { StakingChart } from "@/components/staking-chart"
import { StakingMultiplier } from "@/components/staking-multiplier"
import { StakingActions } from "@/components/staking-actions"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Clock } from "lucide-react"
import { Header } from "@/components/Header"

const stakingStats = [
  {
    title: "Total Staked",
    value: "$127.4M",
    change: "+15.2%",
    icon: DollarSign,
  },
  {
    title: "Current APY",
    value: "24.6%",
    change: "+2.1%",
    icon: TrendingUp,
  },
  {
    title: "Active Stakers",
    value: "8,247",
    change: "+342",
    icon: Users,
  },
  {
    title: "Avg. Lock Time",
    value: "127 days",
    change: "+12 days",
    icon: Clock,
  },
]

export default function StakingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Governance Staking</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              24.6% APY
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Stake DVT tokens to earn rewards and participate in protocol governance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stakingStats.map((stat) => {
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StakingChart type="apy" title="APY Trends" />
          <StakingChart type="rewards" title="Weekly Rewards Distribution" />
        </div>

        {/* Staking Actions and Multipliers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StakingActions />
          </div>
          <div>
            <StakingMultiplier />
          </div>
        </div>
      </main>

      <AIAssistantButton />
    </div>
  )
}
