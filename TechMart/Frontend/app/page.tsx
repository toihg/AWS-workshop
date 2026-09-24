import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { CategoryShowcase } from "@/components/category-showcase"
import { PerksSection } from "@/components/perks-section"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/api"

export default async function HomePage() {
  const products = await getProducts()
  const featured = products.slice(0, 8)

  return (
    <>
      <HeroSection />

      <CategoryShowcase />

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Sản phẩm nổi bật
          </h2>

          <Button
            variant="ghost"
            render={<Link href="/products" />}
            nativeButton={false}
          >
            Xem tất cả
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <PerksSection />
    </>
  )
}