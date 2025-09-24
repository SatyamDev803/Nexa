"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const apyData = [
  { month: "Jan", apy: 12.4 },
  { month: "Feb", apy: 14.2 },
  { month: "Mar", apy: 16.8 },
  { month: "Apr", apy: 15.3 },
  { month: "May", apy: 18.7 },
  { month: "Jun", apy: 22.1 },
  { month: "Jul", apy: 19.5 },
  { month: "Aug", apy: 21.3 },
  { month: "Sep", apy: 24.6 },
  { month: "Oct", apy: 23.8 },
  { month: "Nov", apy: 26.2 },
  { month: "Dec", apy: 25.4 },
]

const rewardsData = [
  { week: "W1", rewards: 145.32 },
  { week: "W2", rewards: 167.89 },
  { week: "W3", rewards: 189.45 },
  { week: "W4", rewards: 203.67 },
  { week: "W5", rewards: 234.12 },
  { week: "W6", rewards: 256.78 },
  { week: "W7", rewards: 289.34 },
  { week: "W8", rewards: 312.56 },
]

interface StakingChartProps {
  type: "apy" | "rewards"
  title: string
}

export function StakingChart({ type, title }: StakingChartProps) {
  const data = type === "apy" ? apyData : rewardsData
  const dataKey = type === "apy" ? "apy" : "rewards"
  const xAxisKey = type === "apy" ? "month" : "week"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {type === "apy" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey={xAxisKey} className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey={dataKey} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
