import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table'
import { type OrderWithRisk } from '../data/schema'

export const ordersColumns: ColumnDef<OrderWithRisk>[] = [
  {
    accessorKey: 'order_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order ID' />
    ),
    cell: ({ row }) => (
      <span className='font-medium'>{row.getValue('order_id')}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    enableSorting: false,
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='City' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'order_value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order Value' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const value = row.getValue<number>('order_value')
      return <span>₹{value.toLocaleString('en-IN')}</span>
    },
  },
  {
    accessorKey: 'risk_score',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Risk Score' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const score = row.getValue<number>('risk_score')
      return <span>{score}%</span>
    },
  },
  {
    accessorKey: 'risk_level',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const level = row.getValue<string>('risk_level')
      const variant =
        level === 'high'
          ? 'destructive'
          : level === 'medium'
            ? 'outline'
            : 'default'
      const label =
        level === 'high'
          ? 'High Risk'
          : level === 'medium'
            ? 'Medium Risk'
            : 'Safe'
      return <Badge variant={variant}>{label}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'order_status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Order Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
