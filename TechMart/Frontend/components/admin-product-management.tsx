"use client"

import { useEffect, useState } from "react"
import { ImageIcon, PackagePlusIcon, SearchIcon, Trash2Icon, UploadCloudIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createProduct, deleteProduct, getProducts, uploadProductImage } from "@/lib/api"
import { formatVND } from "@/lib/format"
import type { Product } from "@/lib/types"

const EMPTY_PRODUCT_FORM = {
  name: "",
  brand: "",
  category: "",
  price: "",
  image: "",
  description: "",
  stock: "0",
  rating: "0",
}

function slugifyProductName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function AdminProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [productSearch, setProductSearch] = useState("")
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadStatus, setUploadStatus] = useState("")
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getProducts()
      .then((loadedProducts) => {
        if (!cancelled) setProducts(loadedProducts)
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Không thể tải danh sách sản phẩm")
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingProducts(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const normalizedSearch = productSearch.trim().toLocaleLowerCase("vi")
  const matchingProducts = products.filter((product) =>
    product.name.toLocaleLowerCase("vi").includes(normalizedSearch),
  )

  async function handleCreateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setMessage("")
    setSaving(true)

    try {
      let finalImageKey = productForm.image.trim()

      if (selectedFile) {
        setUploadStatus("Đang tải ảnh lên Amazon S3...")
        const uploadResult = await uploadProductImage(selectedFile)
        finalImageKey = uploadResult.imageKey
      }

      setUploadStatus("Đang lưu thông tin sản phẩm...")
      const createdProduct = await createProduct({
        slug: slugifyProductName(productForm.name),
        name: productForm.name.trim(),
        brand: productForm.brand.trim(),
        category: productForm.category.trim() as Product["category"],
        price: Number(productForm.price),
        image: finalImageKey,
        description: productForm.description.trim(),
        stock: Number(productForm.stock),
        rating: Number(productForm.rating),
      })

      setProducts((current) => [createdProduct, ...current])
      setProductForm({ ...EMPTY_PRODUCT_FORM })
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      setSelectedFile(null)
      setPreviewUrl(null)
      setMessage(`Đã thêm ${createdProduct.name} và lưu ảnh lên S3 thành công.`)
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Không thể thêm sản phẩm")
    } finally {
      setSaving(false)
      setUploadStatus("")
    }
  }

  async function handleDeleteProduct(product: Product) {
    if (!window.confirm(`Xóa sản phẩm "${product.name}" khỏi cơ sở dữ liệu?`)) return

    setError("")
    setMessage("")
    setDeletingProductId(product.id)
    try {
      await deleteProduct(product.id)
      setProducts((current) => current.filter((item) => item.id !== product.id))
      setMessage(`Đã xóa ${product.name} khỏi cơ sở dữ liệu.`)
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Không thể xóa sản phẩm")
    } finally {
      setDeletingProductId(null)
    }
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
        <p className="mt-1 text-sm text-muted-foreground">Thêm sản phẩm mới hoặc tìm theo tên để xóa khỏi cơ sở dữ liệu.</p>
      </div>

      {error && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <PackagePlusIcon className="size-5 text-primary" />
            Thêm sản phẩm
          </h3>
          <form onSubmit={handleCreateProduct} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="product-name" className="text-sm font-medium">Tên sản phẩm</label>
                <Input id="product-name" value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="product-brand" className="text-sm font-medium">Thương hiệu</label>
                <Input id="product-brand" value={productForm.brand} onChange={(event) => setProductForm((current) => ({ ...current, brand: event.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="product-category" className="text-sm font-medium">Danh mục</label>
                <Input id="product-category" value={productForm.category} onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))} placeholder="Ví dụ: iPhone" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="product-price" className="text-sm font-medium">Giá (VND)</label>
                <Input id="product-price" type="number" min="0" step="1" value={productForm.price} onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="product-stock" className="text-sm font-medium">Tồn kho</label>
                <Input id="product-stock" type="number" min="0" step="1" value={productForm.stock} onChange={(event) => setProductForm((current) => ({ ...current, stock: event.target.value }))} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="product-rating" className="text-sm font-medium">Đánh giá (0–5)</label>
                <Input id="product-rating" type="number" min="0" max="5" step="0.1" value={productForm.rating} onChange={(event) => setProductForm((current) => ({ ...current, rating: event.target.value }))} required />
              </div>
            </div>

            {/* S3 Image Upload Component */}
            <div className="space-y-3 rounded-lg border border-border/70 bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="size-4 text-primary" />
                  Ảnh sản phẩm (Tải lên Amazon S3)
                </label>
                {selectedFile && (
                  <span className="text-xs text-emerald-600 font-medium">
                    {(selectedFile.size / 1024).toFixed(0)} KB
                  </span>
                )}
              </div>

              {previewUrl ? (
                <div className="relative flex items-center gap-3 rounded-md border border-border/70 bg-card p-2.5">
                  <img
                    src={previewUrl}
                    alt="Xem trước ảnh sản phẩm"
                    className="h-16 w-16 rounded-md object-cover border border-border/40 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{selectedFile?.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Ảnh sẽ được tự động lưu lên Amazon S3 khi thêm sản phẩm.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (previewUrl) URL.revokeObjectURL(previewUrl)
                      setSelectedFile(null)
                      setPreviewUrl(null)
                    }}
                    title="Bỏ chọn ảnh"
                  >
                    <XIcon className="size-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="product-file-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/80 bg-background/50 p-4 transition-colors hover:border-primary/60 hover:bg-muted/40"
                >
                  <UploadCloudIcon className="size-7 text-muted-foreground" />
                  <span className="mt-2 text-sm font-medium text-foreground">
                    Nhấn để chọn ảnh từ máy tính
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Hỗ trợ JPG, PNG, WEBP (Tự động tải lên AWS S3)
                  </span>
                  <input
                    id="product-file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        if (previewUrl) URL.revokeObjectURL(previewUrl)
                        setSelectedFile(file)
                        setPreviewUrl(URL.createObjectURL(file))
                      }
                    }}
                  />
                </label>
              )}

              <div>
                <label htmlFor="product-image" className="text-xs text-muted-foreground">
                  Hoặc nhập khóa ảnh S3 có sẵn (nếu không chọn file):
                </label>
                <Input
                  id="product-image"
                  value={productForm.image}
                  onChange={(event) => setProductForm((current) => ({ ...current, image: event.target.value }))}
                  placeholder="products/ten-san-pham.jpg"
                  className="mt-1 text-xs h-8"
                  disabled={!!selectedFile}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="product-description" className="text-sm font-medium">Mô tả</label>
              <textarea id="product-description" value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} rows={3} className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50" />
            </div>
            <p className="text-xs text-muted-foreground">Slug tự tạo: {slugifyProductName(productForm.name) || "nhập tên sản phẩm để tạo"}</p>
            <Button type="submit" disabled={saving}>
              <PackagePlusIcon className="size-4" />
              {saving ? (uploadStatus || "Đang lưu...") : "Thêm vào cơ sở dữ liệu"}
            </Button>
          </form>
        </section>

        <section className="rounded-xl border border-border/60 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Xóa sản phẩm</h3>
            <Badge variant="secondary">{matchingProducts.length} sản phẩm</Badge>
          </div>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={productSearch} onChange={(event) => setProductSearch(event.target.value)} placeholder="Tìm theo tên sản phẩm..." className="pl-9" aria-label="Tìm sản phẩm cần xóa" />
          </div>
          <div className="mt-4 max-h-[480px] divide-y divide-border/60 overflow-y-auto">
            {matchingProducts.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">{loadingProducts ? "Đang tải danh sách sản phẩm..." : products.length === 0 ? "Chưa tải được sản phẩm." : "Không tìm thấy sản phẩm phù hợp."}</p>
            ) : matchingProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category} · {formatVND(product.price)}</p>
                </div>
                <Button type="button" size="sm" variant="destructive" onClick={() => handleDeleteProduct(product)} disabled={deletingProductId === product.id}>
                  <Trash2Icon className="size-4" />
                  {deletingProductId === product.id ? "Đang xóa..." : "Xóa"}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}