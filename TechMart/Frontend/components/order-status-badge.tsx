import { Badge } from "@/components/ui/badge"
import type { OrderStatus } from "@/lib/types"

const STATUS_META: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  PENDING: { label: "Đang chờ xử lý", variant: "secondary" },
  PROCESSING: { label: "Đang xử lý", variant: "outline" },
  COMPLETED: { label: "Hoàn tất", variant: "default" },
  CANCELLED: {
    label: "Cancelled",
    variant: "secondary",
  },
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status]
  return <Badge variant={meta.variant}>{meta.label}</Badge>
}
