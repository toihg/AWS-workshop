"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { CpuIcon, LogOutIcon, MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/products", label: "Sản phẩm" },
  { href: "/orders", label: "Đơn hàng của tôi" },
]

export function Navbar() {
  const { itemCount } = useCart()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [pathname])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.push(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : "/products")
    setMobileOpen(false)
  }

  function handleLogout() {
    logoutUser()
    setUser(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <CpuIcon className="size-5" />
          </span>
          <span className="text-lg">
            Tech<span className="text-primary">Mart</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname.startsWith(link.href) && "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden max-w-sm flex-1 items-center md:flex">
          <div className="relative w-full">
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm laptop, điện thoại, tai nghe..."
              className="pl-9"
              aria-label="Tìm kiếm sản phẩm"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-sm md:flex">
                <UserIcon className="size-4 text-primary" />
                <span>{user.fullName}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:inline-flex">
                <LogOutIcon className="size-4" />
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" render={<Link href="/login" />} nativeButton={false}>
                Đăng nhập
              </Button>
              <Button size="sm" render={<Link href="/register" />} nativeButton={false}>
                Đăng ký
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            render={<Link href="/cart" className="relative" />}
            nativeButton={false}
            aria-label={`Giỏ hàng, ${itemCount} sản phẩm`}
          >
            <ShoppingCartIcon className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 px-4 pb-4 pt-3 md:hidden">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <SearchIcon
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="pl-9"
                aria-label="Tìm kiếm sản phẩm"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <>
                <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>
                  Đăng nhập
                </Link>
                <Link href="/register" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground" onClick={() => setMobileOpen(false)}>
                  Đăng ký
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleLogout()
                  setMobileOpen(false)
                }}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                Đăng xuất
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
