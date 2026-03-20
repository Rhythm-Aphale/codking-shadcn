import { useState } from 'react'
import { toast } from 'sonner'
import { KeyRound, CreditCard, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { type OrderWithRisk } from '../data/schema'

type OrderDetailDrawerProps = {
  order: OrderWithRisk | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetailDrawer({
  order,
  open,
  onOpenChange,
}: OrderDetailDrawerProps) {
  const [actions, setActions] = useState<Record<string, string>>({})

  if (!order) return null

  const riskBadge = {
    high: {
      label: 'High Risk',
      variant: 'destructive' as const,
    },
    medium: {
      label: 'Medium Risk',
      variant: 'outline' as const,
    },
    safe: {
      label: 'Safe',
      variant: 'default' as const,
    },
  }[order.risk_level]

  const handleAction = (action: string) => {
    setActions((prev) => ({ ...prev, [order.order_id]: action }))
    toast.success(`${action} for order ${order.order_id}`)
  }

  const currentAction = actions[order.order_id]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='right' className='sm:max-w-md overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Order {order.order_id}</SheetTitle>
          <SheetDescription>Order details and risk analysis</SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-6 px-4'>
          {/* Customer Details */}
          <div className='space-y-3'>
            <h4 className='text-sm font-semibold'>Customer Details</h4>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='text-muted-foreground'>Name</span>
              <span>{order.customer}</span>
              <span className='text-muted-foreground'>Phone</span>
              <span>{order.phone}</span>
              <span className='text-muted-foreground'>City</span>
              <span>{order.city}</span>
            </div>
          </div>

          <Separator />

          {/* Order Details */}
          <div className='space-y-3'>
            <h4 className='text-sm font-semibold'>Order Details</h4>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='text-muted-foreground'>Order Value</span>
              <span>₹{order.order_value.toLocaleString('en-IN')}</span>
              <span className='text-muted-foreground'>Items</span>
              <span>{order.items}</span>
              <span className='text-muted-foreground'>Payment Method</span>
              <Badge variant='outline'>{order.payment_method}</Badge>
              <span className='text-muted-foreground'>Order Status</span>
              <span>{order.order_status}</span>
              <span className='text-muted-foreground'>Created At</span>
              <span>{order.created_at}</span>
            </div>
          </div>

          <Separator />

          {/* Order History */}
          <div className='space-y-3'>
            <h4 className='text-sm font-semibold'>Customer Order History</h4>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='text-muted-foreground'>Total Orders</span>
              <span>{order.total_orders}</span>
              <span className='text-muted-foreground'>COD Orders</span>
              <span>{order.cod_orders}</span>
              <span className='text-muted-foreground'>Prepaid Orders</span>
              <span>{order.prepaid_orders}</span>
            </div>
          </div>

          <Separator />

          {/* Risk Score Explanation */}
          <div className='space-y-3'>
            <h4 className='text-sm font-semibold'>Risk Analysis</h4>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='text-muted-foreground'>Risk Score</span>
              <span className='font-medium'>{order.risk_score}%</span>
              <span className='text-muted-foreground'>Risk Level</span>
              <Badge variant={riskBadge.variant}>{riskBadge.label}</Badge>
            </div>
            <p className='text-xs text-muted-foreground'>
              Risk score is calculated as (COD orders / Total orders) x 100.
              This customer has {order.cod_orders} COD out of{' '}
              {order.total_orders} total orders ({order.risk_score}%).
              {order.risk_level === 'high' &&
                ' High COD ratio indicates potential risk.'}
              {order.risk_level === 'medium' &&
                ' Moderate COD ratio — monitor closely.'}
              {order.risk_level === 'safe' &&
                ' Low COD ratio — customer appears reliable.'}
            </p>
          </div>

          {/* Action Status */}
          {currentAction && (
            <>
              <Separator />
              <div className='rounded-md bg-muted p-3 text-sm'>
                Action applied:{' '}
                <span className='font-medium'>{currentAction}</span>
              </div>
            </>
          )}
        </div>

        <SheetFooter className='flex-row gap-2'>
          <Button
            size='sm'
            variant='outline'
            className='flex-1'
            onClick={() => handleAction('OTP Sent')}
            disabled={currentAction === 'OTP Sent'}
          >
            <KeyRound className='mr-1 h-4 w-4' />
            Send OTP
          </Button>
          <Button
            size='sm'
            variant='outline'
            className='flex-1'
            onClick={() => handleAction('Forced Prepaid')}
            disabled={currentAction === 'Forced Prepaid'}
          >
            <CreditCard className='mr-1 h-4 w-4' />
            Force Prepaid
          </Button>
          <Button
            size='sm'
            variant='default'
            className='flex-1'
            onClick={() => handleAction('Marked Safe')}
            disabled={currentAction === 'Marked Safe'}
          >
            <ShieldCheck className='mr-1 h-4 w-4' />
            Mark Safe
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
