"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MinusIcon, PlusIcon, ShoppingCartIcon, ZapIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

export function AddToCartPanel({ product }: { product: Product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const outOfStock = product.stock === 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Số lượng</span>
        <div className="flex items-center rounded-md border border-input">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-none"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Giảm số lượng"
          >
            <MinusIcon className="size-4" />
          </Button>
          <span className="w-10 text-center text-sm font-medium" aria-live="polite">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-none"
            disabled={quantity >= product.stock}
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            aria-label="Tăng số lượng"
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">{product.stock} sản phẩm có sẵn</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          size="lg"
          variant="outline"
          disabled={outOfStock}
          onClick={() => {
            addItem(product, quantity)
            toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`)
          }}
        >
          <ShoppingCartIcon data-icon="inline-start" />
          Thêm vào giỏ
        </Button>
        <Button
          size="lg"
          disabled={outOfStock}
          onClick={() => {
            addItem(product, quantity)
            router.push("/checkout")
          }}
        >
          <ZapIcon data-icon="inline-start" />
          Mua ngay
        </Button>
      </div>
    </div>
  )
}
