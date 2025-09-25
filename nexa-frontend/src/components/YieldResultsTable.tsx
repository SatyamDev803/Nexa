// src/components/YieldResultsTable.tsx
"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "./ui/button"
// import { RankedPool } from "@/types"
import { RankedPool } from "@/types"
import { useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { formatTvl } from "@/lib/utils" // We will move the format function to utils



export const columns: ColumnDef<RankedPool>[] = [
  { accessorKey: "platform", header: "Platform" },
  { accessorKey: "chain", header: "Chain" },
  { accessorKey: "token", header: "Asset" },
  {
    accessorKey: "apyNetPct",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Net APY <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `${row.original.apyNetPct.toFixed(2)}%`,
  },
  {
    accessorKey: "tvlUsd",
    header: ({ column }) => (
       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        TVL <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatTvl(row.original.tvlUsd),
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <Button 
        onClick={() => table.options.meta?.onDeposit?.(row.original)}
        size="sm"
      >
        Deposit
      </Button>
    ),
  },
]

interface YieldResultsTableProps {
  data: RankedPool[]
  onDeposit: (pool: RankedPool) => void
}

export function YieldResultsTable({ data, onDeposit }: YieldResultsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "apyNetPct", desc: true },
  ])
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    meta: { onDeposit }, // Pass the onDeposit function to the table's meta object
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}