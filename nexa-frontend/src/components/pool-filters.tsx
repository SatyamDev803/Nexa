"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowRight } from "lucide-react"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const popularChains = ["Arbitrum", "Base", "Solana", "Polygon"];

interface PoolFiltersProps {
  amount: string;
  setAmount: (amount: string) => void;
  sourceToken: string; // New prop for the starting token
  setSourceToken: (token: string) => void; // New prop
  destinationToken: string;
  setDestinationToken: (token: string) => void;
  selectedChains: string[];
  setSelectedChains: (chains: string[]) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function PoolFilters({ 
  amount, setAmount, 
  sourceToken, setSourceToken,
  destinationToken, setDestinationToken,
  selectedChains, setSelectedChains,
  onSearch, isLoading 
}: PoolFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
          {/* You Pay With (Source Token) */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="amount">You Pay With</Label>
            <div className="flex gap-2">
              <Input
                id="amount"
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Select value={sourceToken} onValueChange={setSourceToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEAR">NEAR</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
             <ArrowRight className="h-6 w-6 text-muted-foreground" />
          </div>

          {/* You Receive (Destination Token) */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="token">To Find Yields For</Label>
             <Select value={destinationToken} onValueChange={setDestinationToken}>
              <SelectTrigger id="token">
                <SelectValue placeholder="Select a token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="WBTC">WBTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
        <div className="mt-4 pt-4 border-t">
          <Label>Filter by Blockchains (Optional)</Label>
          <div className="flex justify-between items-center mt-2">
             <ToggleGroup 
              type="multiple" 
              variant="outline"
              value={selectedChains}
              onValueChange={setSelectedChains}
              className="flex-wrap justify-start"
            >
              {popularChains.map(chain => (
                <ToggleGroupItem key={chain} value={chain} aria-label={`Toggle ${chain}`}>
                  {chain}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Button onClick={onSearch} disabled={isLoading || !amount} className="w-full md:w-auto ml-4">
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Searching..." : "Find Pools"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}