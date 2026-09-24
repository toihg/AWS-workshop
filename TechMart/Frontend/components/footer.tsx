import Link from "next/link"
import { CpuIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-3 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <CpuIcon className="size-4" />
            </span>
            <span>
              Tech<span className="text-primary">Mart</span>
            </span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Cửa hàng công nghệ trực tuyến với laptop, điện thoại, thiết bị đeo và phụ kiện chính hãng, giao hàng
            nhanh toàn quốc.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Mua sắm</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/products?category=Laptop" className="hover:text-foreground">
                Laptop
              </Link>
            </li>
            <li>
              <Link href="/products?category=Phone" className="hover:text-foreground">
                Điện thoại
              </Link>
            </li>
            <li>
              <Link href="/products?category=Audio" className="hover:text-foreground">
                Âm thanh
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Hỗ trợ</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/orders" className="hover:text-foreground">
                Theo dõi đơn hàng
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-foreground">
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
