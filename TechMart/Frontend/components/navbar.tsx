"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  CpuIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const ADMIN_SESSION_KEY = "techmart_admin_session"

const NAV_LINKS = [
  { href: "/products", label: "Sản phẩm" },
  { href: "/orders", label: "Đơn hàng của tôi" },
]

function getAdminSession() {
  if (typeof window === "undefined") {
    return null
  }

  return window.localStorage.getItem(ADMIN_SESSION_KEY)
}

export function Navbar() {
  const { itemCount } = useCart()
  const pathname = usePathname()
  const router = useRouter()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  const [adminUsername, setAdminUsername] = useState<string | null>(null)

  useEffect(() => {
    const syncAdminSession = () => setAdminUsername(getAdminSession())
    setUser(getCurrentUser())
    syncAdminSession()
    window.addEventListener("techmart-admin-session-change", syncAdminSession)
    window.addEventListener("storage", syncAdminSession)
    return () => {
      window.removeEventListener("techmart-admin-session-change", syncAdminSession)
      window.removeEventListener("storage", syncAdminSession)
    }
  }, [pathname])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()

    const params = new URLSearchParams()
    if (query.trim()) params.set("q", query.trim())
    if (isAdmin) params.set("admin", "1")
    const search = params.toString()

    router.push(search ? `/products?${search}` : "/products")

    setMobileOpen(false)
  }

  function handleLogout() {
    // Logout admin
    if (adminUsername) {
      window.localStorage.removeItem(ADMIN_SESSION_KEY)
      setAdminUsername(null)
    }

    // Logout user
    if (user) {
      logoutUser()
      setUser(null)
    }

    setMobileOpen(false)
    router.push("/")
  }

  const isAdmin = Boolean(adminUsername)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <CpuIcon className="size-5" />
          </span>

          <span className="text-lg">
            Tech<span className="text-primary">Mart</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {isAdmin ? (
            <Link
              href="/admin"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname.startsWith("/admin") && "text-foreground",
              )}
            >
              Quản trị
            </Link>
          ) : (
            NAV_LINKS.map((link) => (
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
            ))
          )}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="ml-auto hidden max-w-sm flex-1 items-center md:flex"
        >
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

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">

          {/* ADMIN */}
          {isAdmin ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-sm md:flex">
                <UserIcon className="size-4 text-primary" />

                <span>{adminUsername}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex"
              >
                <LogOutIcon className="size-4" />
                Đăng xuất
              </Button>
            </>
          ) : user ? (
            /* USER ĐÃ ĐĂNG NHẬP */
            <>
              <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-sm md:flex">
                <UserIcon className="size-4 text-primary" />

                <span>{user.fullName}</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hidden md:inline-flex"
              >
                <LogOutIcon className="size-4" />
                Đăng xuất
              </Button>
            </>
          ) : (
            /* CHƯA ĐĂNG NHẬP */
            <>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Đăng nhập
              </Button>

              <Button
                size="sm"
                render={<Link href="/register" />}
                nativeButton={false}
              >
                Đăng ký
              </Button>
            </>
          )}

          {/* Cart */}
          {!isAdmin && (
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
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/60 px-4 pb-4 pt-3 md:hidden">

          {/* Mobile search */}
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

          {/* Mobile navigation */}
          <nav className="flex flex-col gap-1">

            {isAdmin ? (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
                  pathname.startsWith("/admin") &&
                    "bg-accent text-foreground",
                )}
              >
                Quản trị
              </Link>
            ) : (
              NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground",
                    pathname.startsWith(link.href) &&
                      "bg-accent text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))
            )}

            {/* Mobile user/admin information */}
            {isAdmin ? (
              <>
                <div className="mt-2 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-sm">
                  <UserIcon className="size-4 text-primary" />

                  <span>{adminUsername}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Đăng xuất
                </button>
              </>
            ) : user ? (
              <>
                <div className="mt-2 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-sm">
                  <UserIcon className="size-4 text-primary" />

                  <span>{user.fullName}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Đăng nhập
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}