import { WalletSummaryCard } from "@/components/wallet-summary-card"
import { StatsCards } from "@/components/stats-cards"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, TrendingUp } from "lucide-react"
import { Header } from "@/components/Header"


const recentActivity = [
  {
    action: "Deposited",
    amount: "$1,000 USDC",
    pool: "Stable Yield Pool",
    time: "2 hours ago",
    status: "completed",
  },
  {
    action: "Claimed",
    amount: "$47.32",
    pool: "ETH Staking",
    time: "1 day ago",
    status: "completed",
  },
  {
    action: "Withdrew",
    amount: "$500 USDT",
    pool: "DeFi Index",
    time: "3 days ago",
    status: "completed",
  },
]

const topPools = [
  {
    name: "Stable Yield Pool",
    apy: "22.4%",
    tvl: "$2.4M",
    risk: "Low",
    tokens: ["USDC", "USDT", "DAI"],
  },
  {
    name: "ETH Liquid Staking",
    apy: "18.7%",
    tvl: "$8.1M",
    risk: "Medium",
    tokens: ["ETH", "stETH"],
  },
  {
    name: "BTC Yield Strategy",
    apy: "15.2%",
    tvl: "$5.3M",
    risk: "Medium",
    tokens: ["WBTC", "BTC"],
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your portfolio overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <WalletSummaryCard />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">30 Days</span>
                  <span className="text-sm font-medium text-green-500">+12.4%</span>
                </div>
                <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg flex items-end justify-center">
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">$2,847.32</div>
                  <div className="text-sm text-muted-foreground">Total Earnings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-primary font-semibold">{activity.amount}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.pool} • {activity.time}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Top Performing Pools</CardTitle>
              <Button variant="ghost" size="sm">
                Explore All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPools.map((pool, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{pool.name}</span>
                      <Badge variant={pool.risk === "Low" ? "secondary" : "outline"}>{pool.risk} Risk</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-primary font-semibold">{pool.apy} APY</span>
                        <span className="text-muted-foreground">TVL: {pool.tvl}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Deposit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AIAssistantButton />
    </div>
  )
}
