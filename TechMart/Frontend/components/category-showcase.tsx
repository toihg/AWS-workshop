import Link from "next/link"
import { HeadphonesIcon, LaptopIcon, SmartphoneIcon, TabletIcon, WatchIcon } from "lucide-react"

const CATEGORY_META = [
  { name: "MacBook", icon: LaptopIcon },
  { name: "iPhone", icon: SmartphoneIcon },
  { name: "iPad", icon: TabletIcon },
  { name: "AirPods", icon: HeadphonesIcon },
  { name: "Apple Watch", icon: WatchIcon },
]

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold">Mua sắm theo danh mục</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {CATEGORY_META.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            href={`/products?category=${name}`}
            className="flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-5 text-center transition-colors hover:border-primary/40"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-medium">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
