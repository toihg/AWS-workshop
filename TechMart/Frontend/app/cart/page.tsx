"use client"

import Link from "next/link"
import { ArrowRightIcon, ShoppingBagIcon } from "lucide-react"
import { CartItemRow } from "@/components/cart-item-row"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useCart } from "@/lib/cart-context"
import { formatVND } from "@/lib/format"

const SHIPPING_THRESHOLD = 2_000_000
const SHIPPING_FEE = 39_000

export default function CartPage() {
  const { items, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBagIcon />
            </EmptyMedia>
            <EmptyTitle>Giỏ hàng của bạn đang trống</EmptyTitle>
            <EmptyDescription>Hãy khám phá các sản phẩm công nghệ mới nhất của TechMart.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link href="/products" />} nativeButton={false}>
              Tiếp tục mua sắm
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Giỏ hàng ({items.length} sản phẩm)</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card px-4 lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.productId} item={item} />
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5">
          <h2 className="font-semibold">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tạm tính</span>
            <span>{formatVND(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phí vận chuyển</span>
            <span>{shipping === 0 ? "Miễn phí" : formatVND(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-muted-foreground">
              Mua thêm {formatVND(SHIPPING_THRESHOLD - subtotal)} để được miễn phí vận chuyển.
            </p>
          )}
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span>Tổng cộng</span>
            <span className="text-primary">{formatVND(total)}</span>
          </div>
          <Button size="lg" render={<Link href="/checkout" />} nativeButton={false} className="mt-2">
            Tiến hành thanh toán
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="ghost" render={<Link href="/products" />} nativeButton={false}>
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    </div>
  )
}
