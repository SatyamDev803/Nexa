// src/components/WinnerPoolCard.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RankedPool } from "@/types"
import { formatTvl } from "@/lib/utils" // We will move the format function to utils

interface WinnerPoolCardProps {
  title: string;
  pool: RankedPool;
  onDeposit: (pool: RankedPool) => void;
  isOverallWinner?: boolean;
}

export function WinnerPoolCard({ title, pool, onDeposit, isOverallWinner = false }: WinnerPoolCardProps) {
  return (
    <Card className={isOverallWinner ? "border-primary border-2" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{pool.platform} on {pool.chain}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Asset</div>
          <div className="font-semibold">{pool.token}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Net APY</div>
          <div className="text-lg font-bold text-primary">{pool.apyNetPct.toFixed(2)}%</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">TVL</div>
          <div className="font-semibold">{formatTvl(pool.tvlUsd)}</div>
        </div>
        <Button onClick={() => onDeposit(pool)} className="w-full">
          Deposit Now
        </Button>
      </CardContent>
    </Card>
  )
}