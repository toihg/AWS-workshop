import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon, ZapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)/12%,_transparent_55%)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ZapIcon className="size-3.5" />
            Công nghệ mới nhất, giá tốt nhất
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Nâng cấp thiết bị của bạn với <span className="text-primary">TechMart</span>
          </h1>
          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Khám phá các sản phẩm công nghệ chính hãng — MacBook, iPhone, iPad, AirPods và Apple Watch. Đặt
            hàng nhanh chóng và theo dõi hành trình đơn hàng theo thời gian thực.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<Link href="/products" />} nativeButton={false}>
              Khám phá sản phẩm
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/orders" />} nativeButton={false}>
              Theo dõi đơn hàng
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TruckIcon className="size-4 text-primary" />
              Giao hàng nhanh 2-4 ngày
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4 text-primary" />
              Bảo hành chính hãng 12 tháng
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md bg-transparent">
          <Image
            src="/images/products/iPhone 17 Pro Max-transparent.png"
            alt="iPhone 17 Pro Max"
            fill
            priority
            className="relative object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </section>
  )
}
