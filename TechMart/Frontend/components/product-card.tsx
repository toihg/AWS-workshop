"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCartIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { useCart } from "@/lib/cart-context"
import { formatVND } from "@/lib/format"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-primary/40">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-secondary/40">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {product.stock <= 8 && (
          <Badge variant="secondary" className="absolute left-3 top-3">
            Sắp hết hàng
          </Badge>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{product.brand}</span>
        <Link href={`/products/${product.slug}`} className="line-clamp-2 font-medium leading-snug hover:text-primary">
          {product.name}
        </Link>
        <StarRating value={product.rating} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-primary">{formatVND(product.price)}</span>
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={() => {
            addItem(product, 1)
            toast.success(`Đã thêm ${product.name} vào giỏ hàng`)
          }}
        >
          <ShoppingCartIcon data-icon="inline-start" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  )
}
