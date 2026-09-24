"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function ProductFilters({ categories }: { categories: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") ?? "all"
  const sort = searchParams.get("sort") ?? "featured"

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all" || value === "featured") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={activeCategory === "all" ? "default" : "outline"}
          onClick={() => updateParam("category", "all")}
        >
          Tất cả
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            size="sm"
            variant={activeCategory === category ? "default" : "outline"}
            className={cn(activeCategory === category && "pointer-events-none")}
            onClick={() => updateParam("category", category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Select value={sort} onValueChange={(value) => {
  if (value) {
    updateParam("sort", value)
  }
}}>
        <SelectTrigger className="w-full sm:w-48" aria-label="Sắp xếp sản phẩm">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="featured">Nổi bật</SelectItem>
            <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
            <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
