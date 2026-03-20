import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type OrderWithRisk } from '../data/schema'

type RiskChartsProps = {
  orders: OrderWithRisk[]
}

const PAYMENT_COLORS = [
  'var(--chart-1)', // COD
  'var(--chart-2)', // Prepaid
]
const RISK_COLORS = {
  'High Risk': 'var(--chart-5)',
  'Medium Risk': 'var(--chart-4)',
  Safe: 'var(--chart-2)',
}

export function RiskCharts({ orders }: RiskChartsProps) {
  // COD vs Prepaid data
  const codCount = orders.filter((o) => o.payment_method === 'COD').length
  const prepaidCount = orders.filter(
    (o) => o.payment_method === 'Prepaid'
  ).length
  const paymentData = [
    { name: 'COD', value: codCount },
    { name: 'Prepaid', value: prepaidCount },
  ]

  // Risk distribution data
  const highCount = orders.filter((o) => o.risk_level === 'high').length
  const mediumCount = orders.filter((o) => o.risk_level === 'medium').length
  const safeCount = orders.filter((o) => o.risk_level === 'safe').length
  const riskData = [
    { name: 'High Risk', value: highCount },
    { name: 'Medium Risk', value: mediumCount },
    { name: 'Safe', value: safeCount },
  ]

  // Orders by city data
  const cityMap: Record<string, number> = {}
  for (const order of orders) {
    cityMap[order.city] = (cityMap[order.city] || 0) + 1
  }
  const cityData = Object.entries(cityMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
      {/* COD vs Prepaid */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>COD vs Prepaid</CardTitle>
          <CardDescription>Payment method distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={paymentData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey='value'
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {paymentData.map((_, index) => (
                  <Cell key={index} fill={PAYMENT_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Risk Distribution</CardTitle>
          <CardDescription>Orders by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={riskData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey='value'
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {riskData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={RISK_COLORS[entry.name as keyof typeof RISK_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Orders by City */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Orders by City</CardTitle>
          <CardDescription>Top 10 cities by order count</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={cityData} layout='vertical' margin={{ left: 10 }}>
              <XAxis
                type='number'
                stroke='#888888'
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type='category'
                dataKey='name'
                stroke='#888888'
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='value'
                name='Orders'
                fill='currentColor'
                radius={[0, 4, 4, 0]}
                className='fill-primary'
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
