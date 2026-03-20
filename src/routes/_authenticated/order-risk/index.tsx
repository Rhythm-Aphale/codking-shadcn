import { createFileRoute } from '@tanstack/react-router'
import { OrderRiskDashboard } from '@/features/order-risk'

export const Route = createFileRoute('/_authenticated/order-risk/')({
  component: OrderRiskDashboard,
})
