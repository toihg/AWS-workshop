"use client"

import { CheckIcon, LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/format"
import type { OrderEvent, OrderEventType } from "@/lib/types"
import { ORDER_EVENT_SEQUENCE } from "@/lib/order-store"

const EVENT_LABELS: Record<OrderEventType, { title: string; description: string }> = {
  OrderCreated: {
    title: "Đơn hàng đã được tạo",
    description: "Hệ thống đã ghi nhận đơn hàng và phát sự kiện OrderCreated.",
  },
  PaymentRequested: {
    title: "Yêu cầu thanh toán",
    description: "Yêu cầu thanh toán được gửi tới cổng thanh toán (PaymentRequested).",
  },
  PaymentCompleted: {
    title: "Thanh toán thành công",
    description: "Thanh toán được xác nhận thành công (PaymentCompleted).",
  },
  InventoryReserved: {
    title: "Giữ hàng trong kho",
    description: "Sản phẩm đã được giữ trong kho để chuẩn bị đóng gói (InventoryReserved).",
  },
  OrderCompleted: {
    title: "Hoàn tất đơn hàng",
    description: "Đơn hàng đã được xử lý xong và sẵn sàng giao vận (OrderCompleted).",
  },
}

export function OrderEventTimeline({ events }: { events: OrderEvent[] }) {
  const doneTypes = new Set(events.map((e) => e.type))

  return (
    <ol className="flex flex-col">
      {ORDER_EVENT_SEQUENCE.map((type, index) => {
        const event = events.find((e) => e.type === type)
        const isDone = doneTypes.has(type)
        const isNext = !isDone && ORDER_EVENT_SEQUENCE.slice(0, index).every((t) => doneTypes.has(t))
        const isLast = index === ORDER_EVENT_SEQUENCE.length - 1

        return (
          <li key={type} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-full w-px",
                  isDone ? "bg-primary" : "bg-border",
                )}
                aria-hidden
              />
            )}
            <span
              className={cn(
                "z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                isDone && "border-primary bg-primary text-primary-foreground",
                isNext && "border-primary text-primary",
                !isDone && !isNext && "border-border text-muted-foreground",
              )}
            >
              {isDone ? (
                <CheckIcon className="size-4" />
              ) : isNext ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </span>

            <div className="flex flex-col gap-0.5 pt-0.5">
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", !isDone && !isNext && "text-muted-foreground")}>
                  {EVENT_LABELS[type].title}
                </span>
                {event && <span className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</span>}
              </div>
              <p className="text-sm text-muted-foreground">
                {isNext ? "Đang xử lý..." : EVENT_LABELS[type].description}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
