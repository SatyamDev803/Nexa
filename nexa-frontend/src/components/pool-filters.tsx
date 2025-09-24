"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

const riskLevels = ["All", "Low", "Medium", "High"]
const strategies = ["All", "Bullish BTC", "Trending ETH", "Limited Downside", "Stable Yield"]
const sortOptions = [
  { value: "apy-desc", label: "Highest APY" },
  { value: "apy-asc", label: "Lowest APY" },
  { value: "tvl-desc", label: "Highest TVL" },
  { value: "tvl-asc", label: "Lowest TVL" },
]

interface PoolFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedRisk: string
  setSelectedRisk: (risk: string) => void
  selectedStrategy: string
  setSelectedStrategy: (strategy: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export function PoolFilters({
  searchQuery,
  setSearchQuery,
  selectedRisk,
  setSelectedRisk,
  selectedStrategy,
  setSelectedStrategy,
  sortBy,
  setSortBy,
}: PoolFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = [selectedRisk !== "All", selectedStrategy !== "All"].filter(Boolean).length

  const clearFilters = () => {
    setSelectedRisk("All")
    setSelectedStrategy("All")
    setSearchQuery("")
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Search and Filter Toggle */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border/40">
              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <div className="flex flex-wrap gap-2">
                  {riskLevels.map((risk) => (
                    <Button
                      key={risk}
                      variant={selectedRisk === risk ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRisk(risk)}
                      className="h-8"
                    >
                      {risk}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Strategy</label>
                <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {strategies.map((strategy) => (
                      <SelectItem key={strategy} value={strategy}>
                        {strategy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="ghost" onClick={clearFilters} className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
