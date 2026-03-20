import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
} from 'lucide-react'

export const riskLevels = [
  {
    label: 'High Risk',
    value: 'high' as const,
    icon: ShieldAlert,
  },
  {
    label: 'Medium Risk',
    value: 'medium' as const,
    icon: AlertTriangle,
  },
  {
    label: 'Safe',
    value: 'safe' as const,
    icon: ShieldCheck,
  },
]

export const orderStatuses = [
  {
    label: 'Pending',
    value: 'Pending' as const,
    icon: Clock,
  },
  {
    label: 'Shipped',
    value: 'Shipped' as const,
    icon: Truck,
  },
  {
    label: 'Delivered',
    value: 'Delivered' as const,
    icon: PackageCheck,
  },
  {
    label: 'Cancelled',
    value: 'Cancelled' as const,
    icon: XCircle,
  },
]
