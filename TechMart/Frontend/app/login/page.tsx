"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRightIcon, LockKeyholeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser, loginAdmin } from "@/lib/api"
import { setCurrentUser } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      try {
        const admin = await loginAdmin(identifier, password)

        if (admin.role === "ADMIN") {
          localStorage.setItem("admin", JSON.stringify(admin))
          localStorage.setItem("techmart_admin_session", admin.username)
          router.push("/admin")
          return
        }
      } catch {
        // Không phải tài khoản admin → tiếp tục đăng nhập user
      }

      const user = await loginUser(identifier, password)
      setCurrentUser(user)

      router.push("/")
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Email/số điện thoại hoặc mật khẩu không đúng"
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LockKeyholeIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Chào mừng trở lại</p>
            <h1 className="text-2xl font-semibold">Đăng nhập</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email hoặc số điện thoại</Label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="name@example.com hoặc 090xxxxxxx"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            <ArrowRightIcon className="size-4" />
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
