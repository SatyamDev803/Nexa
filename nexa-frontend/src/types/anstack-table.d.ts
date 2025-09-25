// src/types/tanstack-table.d.ts
import { type RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // This tells TanStack Table that our table's meta object
  // can have an optional onDeposit function.
  interface TableMeta<TData extends RowData> {
    onDeposit?: (data: TData) => void
  }
}