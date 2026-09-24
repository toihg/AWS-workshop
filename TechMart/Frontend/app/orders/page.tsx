"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRightIcon, ReceiptIcon } from "lucide-react"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getOrders } from "@/lib/order-store"
import { formatDateTime, formatVND } from "@/lib/format"
import type { Order } from "@/lib/types"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null)

  useEffect(() => {
    setOrders(getOrders())
    const interval = setInterval(() => setOrders(getOrders()), 1500)
    return () => clearInterval(interval)
  }, [])

  if (orders === null) return null

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ReceiptIcon />
            </EmptyMedia>
            <EmptyTitle>Bạn chưa có đơn hàng nào</EmptyTitle>
            <EmptyDescription>Đơn hàng của bạn sẽ hiển thị ở đây sau khi bạn đặt mua.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link href="/products" />} nativeButton={false}>
              Khám phá sản phẩm
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
      <p className="mt-1 text-sm text-muted-foreground">Theo dõi trạng thái xử lý từng đơn hàng của bạn.</p>

      <div className="mt-6 flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.productId}
                    className="relative size-12 overflow-hidden rounded-full border-2 border-card bg-secondary/40"
                  >
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1.5" />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.items.length} sản phẩm · {formatDateTime(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <OrderStatusBadge status={order.status} />
              <span className="font-semibold text-primary">{formatVND(order.total)}</span>
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
