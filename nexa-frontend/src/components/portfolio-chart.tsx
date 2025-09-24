"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const portfolioData = [
  { date: "Jan 1", value: 10000, pnl: 0 },
  { date: "Jan 15", value: 10847, pnl: 847 },
  { date: "Feb 1", value: 11234, pnl: 1234 },
  { date: "Feb 15", value: 12156, pnl: 2156 },
  { date: "Mar 1", value: 11892, pnl: 1892 },
  { date: "Mar 15", value: 13247, pnl: 3247 },
  { date: "Apr 1", value: 14589, pnl: 4589 },
  { date: "Apr 15", value: 15234, pnl: 5234 },
  { date: "May 1", value: 16847, pnl: 6847 },
  { date: "May 15", value: 17456, pnl: 7456 },
  { date: "Jun 1", value: 18263, pnl: 8263 },
]

interface PortfolioChartProps {
  timeframe: "7d" | "30d" | "90d" | "1y"
}

export function PortfolioChart({ timeframe }: PortfolioChartProps) {
  const currentValue = portfolioData[portfolioData.length - 1].value
  const initialValue = portfolioData[0].value
  const totalGain = currentValue - initialValue
  const totalGainPercent = ((totalGain / initialValue) * 100).toFixed(2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio Performance</CardTitle>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-2xl font-bold">${currentValue.toLocaleString()}</div>
            <div className="text-sm text-green-500">
              +${totalGain.toLocaleString()} ({totalGainPercent}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
              <YAxis className="text-xs fill-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Portfolio Value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
