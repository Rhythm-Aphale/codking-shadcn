import { Package, ShieldAlert, Banknote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type OrderWithRisk } from '../data/schema'

type SummaryCardsProps = {
  orders: OrderWithRisk[]
}

export function SummaryCards({ orders }: SummaryCardsProps) {
  const totalOrders = orders.length
  const highRiskOrders = orders.filter((o) => o.risk_level === 'high').length
  const codOrders = orders.filter((o) => o.payment_method === 'COD').length
  const codPercentage =
    totalOrders > 0 ? ((codOrders / totalOrders) * 100).toFixed(1) : '0'

  const cards = [
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: Package,
      description: `${codOrders} COD, ${totalOrders - codOrders} Prepaid`,
    },
    {
      title: 'High Risk Orders',
      value: highRiskOrders,
      icon: ShieldAlert,
      description: `${totalOrders > 0 ? ((highRiskOrders / totalOrders) * 100).toFixed(1) : 0}% of total orders`,
    },
    {
      title: 'COD Percentage',
      value: `${codPercentage}%`,
      icon: Banknote,
      description: `${codOrders} out of ${totalOrders} orders`,
    },
  ]

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{card.title}</CardTitle>
            <card.icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{card.value}</div>
            <p className='text-xs text-muted-foreground'>{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
