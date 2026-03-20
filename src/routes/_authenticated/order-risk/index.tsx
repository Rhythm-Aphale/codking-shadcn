import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { OrderRiskDashboard } from '@/features/order-risk'
import { riskLevels, orderStatuses } from '@/features/order-risk/data/data'

const orderRiskSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  risk_level: z
    .array(z.enum(riskLevels.map((r) => r.value)))
    .optional()
    .catch([]),
  order_status: z
    .array(z.enum(orderStatuses.map((s) => s.value)))
    .optional()
    .catch([]),
  city: z.array(z.string()).optional().catch([]),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/order-risk/')({
  validateSearch: orderRiskSearchSchema,
  component: OrderRiskDashboard,
})
