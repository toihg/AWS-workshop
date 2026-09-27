import { Suspense } from "react"
import type { Metadata } from "next"
import { PackageSearchIcon } from "lucide-react"
import { ProductFilters } from "@/components/product-filters"
import { ProductCard } from "@/components/product-card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export const metadata: Metadata = {
  title: "Sản phẩm | TechMart",
  description: "Khám phá laptop, điện thoại, tai nghe, thiết bị đeo và phụ kiện công nghệ tại TechMart.",
}

function filterAndSort(products: Product[], params: { category?: string; sort?: string; q?: string }): Product[] {
  let list = [...products]

  if (params.q) {
    const query = params.q.toLowerCase()
    list = list.filter(
      (p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.category.toLowerCase().includes(query),
    )
  }

  if (params.category) {
    list = list.filter((p) => p.category === params.category)
  }

  switch (params.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      list.sort((a, b) => b.price - a.price)
      break
    case "rating":
      list.sort((a, b) => b.rating - a.rating)
      break
    default:
      break
  }

  return list
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string; admin?: string }>
}) {
  const params = await searchParams
  const adminView = params.admin === "1"
  const allProducts = await getProducts()
  const products = filterAndSort(allProducts, params)
  const categories = Array.from(new Set(allProducts.map((product) => product.category)))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {params.q ? `Kết quả tìm kiếm cho "${params.q}"` : "Tất cả sản phẩm"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{products.length} sản phẩm</p>
      </div>

      <Suspense>
        <ProductFilters categories={categories} />
      </Suspense>

      {products.length === 0 ? (
        <Empty className="mt-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageSearchIcon />
            </EmptyMedia>
            <EmptyTitle>Không tìm thấy sản phẩm</EmptyTitle>
            <EmptyDescription>Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} adminView={adminView} />
          ))}
        </div>
      )}
    </div>
  )
}
