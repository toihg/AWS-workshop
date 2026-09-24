"use client"

import Image from "next/image"
import Link from "next/link"
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatVND } from "@/lib/format"
import type { CartItem } from "@/lib/types"

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-secondary/40 sm:size-24">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href="/products" className="text-sm font-medium leading-snug hover:text-primary sm:text-base">
            {item.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.productId)}
            aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
        <span className="text-sm font-semibold text-primary">{formatVND(item.price)}</span>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-md border border-input">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-none"
              disabled={item.quantity <= 1}
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              aria-label="Giảm số lượng"
            >
              <MinusIcon className="size-3.5" />
            </Button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-none"
              disabled={item.quantity >= item.stock}
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              aria-label="Tăng số lượng"
            >
              <PlusIcon className="size-3.5" />
            </Button>
          </div>
          <span className="text-sm font-semibold">{formatVND(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  )
}
