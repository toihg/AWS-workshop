"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowRightIcon, PhoneIcon, UserPlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/lib/api"
import { setCurrentUser } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await registerUser(fullName, email, phone, password)
      setCurrentUser(user)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Không thể đăng ký tài khoản")
      setLoading(false)
      return
    }

    setLoading(false)
    router.push("/")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlusIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tạo tài khoản mới</p>
            <h1 className="text-2xl font-semibold">Đăng ký</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <div className="relative">
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0901234567"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            <ArrowRightIcon className="size-4" />
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
