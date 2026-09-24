import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ChevronRightIcon, ShieldCheckIcon, TruckIcon, UndoIcon } from "lucide-react"
import { AddToCartPanel } from "@/components/add-to-cart-panel"
import { ProductCard } from "@/components/product-card"
import { StarRating } from "@/components/star-rating"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProducts } from "@/lib/api"
import { formatVND } from "@/lib/format"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find((item) => item.slug === slug)
  if (!product) return { title: "Sản phẩm không tồn tại | TechMart" }
  return {
    title: `${product.name} | TechMart`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find((item) => item.slug === slug)
  if (!product) notFound()

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-foreground">
          Sản phẩm
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-secondary/40">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            priority
            className="object-contain p-10"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </span>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <StarRating value={product.rating} />
            <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}/5</span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>

          <p className="text-3xl font-semibold text-primary">{formatVND(product.price)}</p>

          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <Separator />

          <AddToCartPanel product={product} />

          <Separator />

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <TruckIcon className="size-4 text-primary" />
              Giao nhanh 2-4 ngày
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4 text-primary" />
              Bảo hành 12 tháng
            </div>
            <div className="flex items-center gap-2">
              <UndoIcon className="size-4 text-primary" />
              Đổi trả trong 7 ngày
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Sản phẩm liên quan</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
