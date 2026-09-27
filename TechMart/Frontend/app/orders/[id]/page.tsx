"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { ChevronLeftIcon } from "lucide-react"
import { OrderEventTimeline } from "@/components/order-event-timeline"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { getOrderById, getOrderEvents } from "@/lib/order-store"
import { formatDateTime, formatVND } from "@/lib/format"
import type { Order, OrderEvent } from "@/lib/types"

const PAYMENT_LABELS: Record<string, string> = {
  COD: "Thanh toán khi nhận hàng (COD)",
  BANK_TRANSFER: "Chuyển khoản ngân hàng",
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null | undefined>(undefined)
  const [events, setEvents] = useState<OrderEvent[]>([])

  useEffect(() => {
    function refresh() {
      const found = getOrderById(params.id)
      setOrder(found ?? null)
      if (found) setEvents(getOrderEvents(found.id))
    }
    refresh()
    const interval = setInterval(refresh, 1000)
    return () => clearInterval(interval)
  }, [params.id])

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    )
  }

  if (order === null) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/orders" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeftIcon className="size-4" />
        Quay lại đơn hàng
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Đơn hàng {order.id}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Đặt ngày {formatDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="font-semibold">Trạng thái xử lý (event-driven)</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mô phỏng luồng sự kiện: OrderCreated → PaymentRequested → PaymentCompleted → InventoryReserved →
              OrderCompleted.
            </p>
            <div className="mt-5">
              <OrderEventTimeline events={events} />
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="font-semibold">Sản phẩm</h2>
            <div className="mt-4 flex flex-col divide-y divide-border/60">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 py-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border/60 bg-secondary/40">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Số lượng: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatVND(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="font-semibold">Thông tin giao hàng</h2>
            <div className="mt-3 flex flex-col gap-1 text-sm">
              <span>{order.customer.fullName}</span>
              <span className="text-muted-foreground">{order.customer.phone}</span>
              {order.customer.email && <span className="text-muted-foreground">{order.customer.email}</span>}
              <span className="text-muted-foreground">{order.customer.address}</span>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="font-semibold">Thanh toán</h2>
            <p className="mt-3 text-sm text-muted-foreground">{PAYMENT_LABELS[order.paymentMethod]}</p>
            {order.paymentMethod === "BANK_TRANSFER" && order.bankTransferLast4 && (
              <p className="mt-2 text-sm text-muted-foreground">Mã giao dịch: ****{order.bankTransferLast4}</p>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between text-base font-semibold">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatVND(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
