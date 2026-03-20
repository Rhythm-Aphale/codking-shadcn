import { z } from 'zod'

export const orderSchema = z.object({
  order_id: z.string(),
  customer: z.string(),
  phone: z.string(),
  city: z.string(),
  order_value: z.number(),
  total_orders: z.number(),
  cod_orders: z.number(),
  prepaid_orders: z.number(),
  payment_method: z.enum(['COD', 'Prepaid']),
  order_status: z.enum(['Pending', 'Delivered', 'Shipped', 'Cancelled']),
  items: z.number(),
  created_at: z.string(),
})

export type Order = z.infer<typeof orderSchema>

export type RiskLevel = 'high' | 'medium' | 'safe'

export type OrderWithRisk = Order & {
  risk_score: number
  risk_level: RiskLevel
}

export function computeRiskScore(order: Order): number {
  if (order.total_orders === 0) return 0
  return Math.round((order.cod_orders / order.total_orders) * 100)
}

export function getRiskLevel(score: number): RiskLevel {
  if (score > 70) return 'high'
  if (score >= 40) return 'medium'
  return 'safe'
}

export function enrichOrder(order: Order): OrderWithRisk {
  const risk_score = computeRiskScore(order)
  return { ...order, risk_score, risk_level: getRiskLevel(risk_score) }
}
