"use client"
import { useState } from "react"
import { PoolFilters } from "@/components/pool-filters"
import { PoolCard } from "@/components/pool-card"
import { DepositModal } from "@/components/deposit-modal"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Target } from "lucide-react"
import { Header } from "@/components/Header"

const pools = [
  {
    id: "1",
    name: "Basis Traded LBTC",
    tokens: ["LBTC"],
    apy: "27.9%",
    tvl: "$2.79m",
    risk: "Medium" as const,
    strategy: "Bullish BTC",
    description: "Leveraged Bitcoin trading strategy with automated rebalancing and risk management.",
    minDeposit: "0.1 BTC",
    lockPeriod: "30 days",
  },
  {
    id: "2",
    name: "Basis Traded weETH",
    tokens: ["weETH"],
    apy: "21.65%",
    tvl: "$1.65m",
    risk: "Medium" as const,
    strategy: "Bullish BTC",
    description: "Ethereum-based yield strategy with liquid staking rewards and trading premiums.",
    minDeposit: "0.5 ETH",
  },
  {
    id: "3",
    name: "rsweETH Harvest",
    tokens: ["rsweETH"],
    apy: "17.92%",
    tvl: "$7.92m",
    risk: "Low" as const,
    strategy: "Trending ETH",
    description: "Restaked Ethereum harvesting strategy with compound rewards and low volatility.",
    minDeposit: "0.1 ETH",
  },
  {
    id: "4",
    name: "sUSDe Bull",
    tokens: ["sUSDe"],
    apy: "31.97%",
    tvl: "$1.97m",
    risk: "Medium" as const,
    strategy: "Bullish BTC",
    description: "Synthetic USD strategy with delta-neutral positioning and high yield generation.",
    minDeposit: "$100",
  },
  {
    id: "5",
    name: "XRP Yield",
    tokens: ["XRP"],
    apy: "10.98%",
    tvl: "$0.98m",
    risk: "High" as const,
    strategy: "Limited Downside",
    description: "XRP-based yield farming with cross-chain opportunities and risk mitigation.",
    minDeposit: "100 XRP",
    lockPeriod: "14 days",
  },
  {
    id: "6",
    name: "VeChain Staking",
    tokens: ["VET"],
    apy: "14.53%",
    tvl: "$1.53m",
    risk: "Medium" as const,
    strategy: "Trending ETH",
    description: "VeChain ecosystem staking with governance rewards and network participation.",
    minDeposit: "1000 VET",
  },
  {
    id: "7",
    name: "Stacks DeFi",
    tokens: ["STX"],
    apy: "23.10%",
    tvl: "$3.10m",
    risk: "Medium" as const,
    strategy: "Bullish BTC",
    description: "Bitcoin-secured smart contracts with Stacks protocol yield opportunities.",
    minDeposit: "50 STX",
  },
  {
    id: "8",
    name: "Stable Yield Pool",
    tokens: ["USDC", "USDT", "DAI"],
    apy: "12.4%",
    tvl: "$15.2m",
    risk: "Low" as const,
    strategy: "Stable Yield",
    description: "Multi-stablecoin pool with automated rebalancing and consistent returns.",
    minDeposit: "$50",
  },
]

const globalStats = [
  {
    title: "Total Value Locked",
    value: "$34.74M",
    change: "+8.2%",
    icon: DollarSign,
  },
  {
    title: "Active Pools",
    value: "24",
    change: "+3 new",
    icon: Target,
  },
  {
    title: "Avg. APY",
    value: "19.8%",
    change: "+2.1%",
    icon: TrendingUp,
  },
]

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRisk, setSelectedRisk] = useState("All")
  const [selectedStrategy, setSelectedStrategy] = useState("All")
  const [sortBy, setSortBy] = useState("apy-desc")
  const [selectedPool, setSelectedPool] = useState<(typeof pools)[0] | null>(null)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)

  const handleDeposit = (poolId: string) => {
    const pool = pools.find((p) => p.id === poolId)
    if (pool) {
      setSelectedPool(pool)
      setIsDepositModalOpen(true)
    }
  }

  const filteredPools = pools
    .filter((pool) => {
      const matchesSearch =
        pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pool.tokens.some((token) => token.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesRisk = selectedRisk === "All" || pool.risk === selectedRisk
      const matchesStrategy = selectedStrategy === "All" || pool.strategy === selectedStrategy
      return matchesSearch && matchesRisk && matchesStrategy
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "apy-desc":
          return Number.parseFloat(b.apy) - Number.parseFloat(a.apy)
        case "apy-asc":
          return Number.parseFloat(a.apy) - Number.parseFloat(b.apy)
        case "tvl-desc":
          return Number.parseFloat(b.tvl.replace(/[$m]/g, "")) - Number.parseFloat(a.tvl.replace(/[$m]/g, ""))
        case "tvl-asc":
          return Number.parseFloat(a.tvl.replace(/[$m]/g, "")) - Number.parseFloat(b.tvl.replace(/[$m]/g, ""))
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Yield Pools</h1>
          <p className="text-muted-foreground">
            Discover high-yield opportunities across DeFi protocols with automated strategies.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {globalStats.map((stat) => {
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

        {/* Filters */}
        <PoolFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRisk={selectedRisk}
          setSelectedRisk={setSelectedRisk}
          selectedStrategy={selectedStrategy}
          setSelectedStrategy={setSelectedStrategy}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {filteredPools.length} Pool{filteredPools.length !== 1 ? "s" : ""}
            </span>
            {(selectedRisk !== "All" || selectedStrategy !== "All" || searchQuery) && (
              <Badge variant="secondary">Filtered</Badge>
            )}
          </div>
        </div>

        {/* Pool Grid */}
        {filteredPools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} onDeposit={handleDeposit} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <CardContent>
              <div className="text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No pools found</h3>
                <p>Try adjusting your filters or search terms to find more pools.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <AIAssistantButton />

      {/* Deposit Modal */}
      <DepositModal pool={selectedPool} isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />
    </div>
  )
}
