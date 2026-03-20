import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Skeleton } from '@/components/ui/skeleton'
import { SummaryCards } from './components/summary-cards'
import { OrdersTable } from './components/orders-table'
import { OrderDetailDrawer } from './components/order-detail-drawer'
import { RiskCharts } from './components/risk-charts'
import { type OrderWithRisk } from './data/schema'
import { fetchOrders } from './data/orders-api'

export function OrderRiskDashboard() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  const [selectedOrder, setSelectedOrder] = useState<OrderWithRisk | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleRowClick = (order: OrderWithRisk) => {
    setSelectedOrder(order)
    setDrawerOpen(true)
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Order Risk Dashboard
          </h2>
          <p className='text-muted-foreground'>
            Monitor potentially risky orders and take actions.
          </p>
        </div>

        {isLoading ? (
          <>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className='h-[120px] rounded-xl' />
              ))}
            </div>
            <Skeleton className='h-[300px] rounded-xl' />
            <Skeleton className='h-[400px] rounded-xl' />
          </>
        ) : orders ? (
          <>
            <SummaryCards orders={orders} />
            <RiskCharts orders={orders} />
            <OrdersTable data={orders} onRowClick={handleRowClick} />
          </>
        ) : null}
      </Main>

      <OrderDetailDrawer
        order={selectedOrder}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  )
}
