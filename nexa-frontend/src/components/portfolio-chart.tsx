// src/components/portfolio-chart.tsx
"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const portfolioData = [
  { date: "2024-04-01", value: 15000 }, { date: "2024-04-05", value: 15234 },
  { date: "2024-04-10", value: 15012 }, { date: "2024-04-15", value: 15567 },
  { date: "2024-04-20", value: 15321 }, { date: "2024-04-25", value: 15890 },
  { date: "2024-04-30", value: 16201 }, { date: "2024-05-05", value: 15987 },
  { date: "2024-05-10", value: 16543 }, { date: "2024-05-15", value: 16899 },
  { date: "2024-05-20", value: 17234 }, { date: "2024-05-25", value: 16980 },
  { date: "2024-05-30", value: 17546 }, { date: "2024-06-05", value: 18011 },
  { date: "2024-06-10", value: 17890 }, { date: "2024-06-15", value: 18321 },
  { date: "2024-06-20", value: 18888 }, { date: "2024-06-25", value: 19123 },
  { date: "2024-06-30", value: 19500 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface PortfolioChartProps {
  timeframe: "7d" | "30d" | "90d" | "1y"
}

export function PortfolioChart({ timeframe }: PortfolioChartProps) {
  const filteredData = React.useMemo(() => {
    const referenceDate = new Date(portfolioData[portfolioData.length - 1].date)
    let daysToSubtract = 90
    if (timeframe === "30d") {
      daysToSubtract = 30
    } else if (timeframe === "7d") {
      daysToSubtract = 7
    } else if (timeframe === "1y") {
      daysToSubtract = 365
    }
    
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return portfolioData.filter((item) => new Date(item.date) >= startDate)
  }, [timeframe])

  const totalValue = filteredData.length > 0 ? filteredData[filteredData.length - 1].value : 0
  const startValue = filteredData.length > 0 ? filteredData[0].value : 0
  const gain = totalValue - startValue
  const gainPercent = startValue > 0 ? (gain / startValue) * 100 : 0

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>
            Showing performance for the selected time range
          </CardDescription>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className={`text-sm font-medium ${gain >= 0 ? "text-green-500" : "text-red-500"}`}>
              {gain >= 0 ? "+" : ""}${gain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({gainPercent.toFixed(2)}%)
            </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-value)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              domain={["dataMin - 500", "dataMax + 500"]}
              hide={true}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })
                  }}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="var(--color-value)"
              // The stackId="a" property has been removed from here
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}