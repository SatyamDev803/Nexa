"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const apyData = [
  { month: "Jan", apy: 22.4 }, { month: "Feb", apy: 23.2 },
  { month: "Mar", apy: 21.8 }, { month: "Apr", apy: 24.3 },
  { month: "May", apy: 25.7 }, { month: "Jun", apy: 23.1 },
  { month: "Jul", apy: 26.5 }, { month: "Aug", apy: 27.3 },
  { month: "Sep", apy: 24.6 }, { month: "Oct", apy: 26.8 },
  { month: "Nov", apy: 28.2 }, { month: "Dec", apy: 27.4 },
]

const rewardsData = [
  { week: "W1", rewards: 145 }, { week: "W2", rewards: 187 },
  { week: "W3", rewards: 165 }, { week: "W4", rewards: 213 },
  { week: "W5", rewards: 234 }, { week: "W6", rewards: 201 },
  { week: "W7", rewards: 289 }, { week: "W8", rewards: 312 },
]

// FIX: Removed the hsl() wrappers from the color definitions
const chartConfig = {
  apy: {
    label: "APY",
    color: "var(--chart-1)",
  },
  rewards: {
    label: "Rewards",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

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
        <ChartContainer config={chartConfig} className="h-64 w-full">
          {type === "apy" ? (
            <AreaChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillApy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-apy)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-apy)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} tickMargin={8} className="text-xs fill-muted-foreground" />
              <YAxis domain={["dataMin - 2", "dataMax + 2"]} hide={true} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" formatter={(value) => `${value}%`} />}
              />
              <Area
                dataKey={dataKey}
                type="natural"
                fill="url(#fillApy)"
                stroke="var(--color-apy)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} tickMargin={8} className="text-xs fill-muted-foreground" />
              <YAxis domain={["dataMin - 20", "dataMax + 20"]} hide={true} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" formatter={(value) => `$${value}`} />}
              />
              <Bar dataKey={dataKey} fill="var(--color-apy)" radius={4} />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}