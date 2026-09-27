"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2Icon, ClipboardListIcon, ShieldCheckIcon, TruckIcon, TrendingUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AdminProductManagement } from "@/components/admin-product-management"
import { confirmBackendPayment, getAdminOrders, loginAdmin } from "@/lib/api"
import { formatDateTime, formatVND } from "@/lib/format"
import type { Order } from "@/lib/types"

const ADMIN_SESSION_KEY = "techmart_admin_session"

function isAdminSessionActive() {
  return typeof window !== "undefined" && window.localStorage.getItem(ADMIN_SESSION_KEY) === "ADMIN"
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmationError, setConfirmationError] = useState("")
  const [confirmingOrderId, setConfirmingOrderId] = useState<string | null>(null)

  useEffect(() => {
    const active = isAdminSessionActive()
    setAuthenticated(active)
    if (active) refreshOrders()
  }, [])

  useEffect(() => {
    if (!authenticated) return
    const refresh = () => refreshOrders()
    const interval = setInterval(refresh, 1000)
    window.addEventListener("storage", refresh)
    return () => {
      clearInterval(interval)
      window.removeEventListener("storage", refresh)
    }
  }, [authenticated])

  async function refreshOrders() {
    try {
      setOrders(await getAdminOrders())
      setConfirmationError("")
    } catch (loadError) {
      setConfirmationError(loadError instanceof Error ? loadError.message : "Không thể tải đơn hàng từ backend")
    }
  }

  const bankTransferOrders = useMemo(
    () => orders
      .filter((order) => order.paymentMethod === "BANK_TRANSFER")
      .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()),
    [orders],
  )
  const pendingCount = bankTransferOrders.filter((order) => order.paymentStatus !== "CONFIRMED").length
  const referencesReceivedCount = bankTransferOrders.filter(
    (order) => order.paymentStatus !== "CONFIRMED" && Boolean(order.bankTransferLast4),
  ).length
  const shippingOrders = useMemo(
    () => orders.filter((order) => order.status === "PROCESSING"),
    [orders],
  )
  const completedOrders = useMemo(
    () => orders.filter((order) => order.status === "COMPLETED"),
    [orders],
  )
  const revenue = completedOrders.reduce((total, order) => total + order.total, 0)

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      const admin = await loginAdmin(username.trim(), password)

      window.localStorage.setItem(
        ADMIN_SESSION_KEY,
        admin.username
      )
      window.dispatchEvent(new Event("techmart-admin-session-change"))

      setAuthenticated(true)
      await refreshOrders()
      setPassword("")
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Không thể đăng nhập admin")
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirm(orderId: string) {
    setConfirmationError("")
    setConfirmingOrderId(orderId)
    try {
      const updatedOrder = await confirmBackendPayment(orderId)
      setOrders((current) => current.map((order) => order.id === updatedOrder.id ? updatedOrder : order))
    } catch (confirmError) {
      setConfirmationError(confirmError instanceof Error ? confirmError.message : "Không thể xác nhận thanh toán")
    } finally {
      setConfirmingOrderId(null)
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(ADMIN_SESSION_KEY)
    window.localStorage.removeItem("techmart_admin_username")
    window.dispatchEvent(new Event("techmart-admin-session-change"))
    setAuthenticated(false)
    setOrders([])
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Khu vực quản trị</p>
              <h1 className="text-2xl font-semibold">Đăng nhập admin</h1>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="admin-username" className="text-sm font-medium">Tài khoản</label>
              <Input id="admin-username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="ADMIN" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">Mật khẩu</label>
              <Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang xác thực..." : "Đăng nhập quản trị"}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <ClipboardListIcon className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Admin dashboard</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Quản lý đơn hàng</h1>
          <p className="mt-1 text-sm text-muted-foreground">Đơn vẫn được giữ lại sau khi khách gửi mã giao dịch để admin đối soát.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Tổng đơn hàng</p>
          <p className="mt-2 text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Chuyển khoản chờ xác nhận</p>
          <p className="mt-2 text-2xl font-semibold text-amber-600">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Đã nhận mã giao dịch</p>
          <p className="mt-2 text-2xl font-semibold text-blue-600">{referencesReceivedCount}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="text-sm text-muted-foreground">Đã xác nhận chuyển khoản</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">{bankTransferOrders.length - pendingCount}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><TruckIcon className="size-4" /> Đang vận chuyển</p>
          <p className="mt-2 text-2xl font-semibold text-sky-600">{shippingOrders.length}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><TrendingUpIcon className="size-4" /> Doanh thu</p>
          <p className="mt-2 text-xl font-semibold text-emerald-600">{formatVND(revenue)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Từ đơn đã hoàn thành</p>
        </div>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Đơn chuyển khoản</h2>
          <Badge variant="secondary">{bankTransferOrders.length} đơn</Badge>
        </div>
        {confirmationError && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{confirmationError}</p>}
        {bankTransferOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-12 text-center text-sm text-muted-foreground">
            Chưa có đơn hàng thanh toán chuyển khoản.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
            <div className="hidden grid-cols-[1.1fr_1.3fr_1fr_0.8fr_1.1fr] gap-4 border-b border-border/60 bg-muted/30 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:grid">
              <span>Đơn hàng</span><span>Khách hàng</span><span>Ngày đặt</span><span>Tổng tiền</span><span>Trạng thái</span>
            </div>
            <div className="divide-y divide-border/60">
              {bankTransferOrders.map((order) => {
                const confirmed = order.paymentStatus === "CONFIRMED"
                return (
                  <div key={order.id} className="grid gap-4 px-5 py-5 md:grid-cols-[1.1fr_1.3fr_1fr_0.8fr_1.1fr] md:items-center">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{order.items.length} sản phẩm</p>
                    </div>
                    <div>
                      <p className="font-medium">{order.customer.fullName}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                      {order.customer.email && <p className="truncate text-sm text-muted-foreground">{order.customer.email}</p>}
                      {order.bankTransferLast4 && <p className="mt-1 text-xs font-medium text-primary">Mã giao dịch: ****{order.bankTransferLast4}</p>}
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDateTime(order.createdAt)}</p>
                    <p className="font-semibold text-primary">{formatVND(order.total)}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {confirmed ? (
                        <Badge variant="default"><CheckCircle2Icon /> Đã xác nhận</Badge>
                      ) : order.bankTransferLast4 ? (
                        <Button size="sm" onClick={() => handleConfirm(order.id)} disabled={confirmingOrderId === order.id}>
                          <CheckCircle2Icon /> {confirmingOrderId === order.id ? "Đang xác nhận..." : "Đã có mã - xác nhận"}
                        </Button>
                      ) : (
                        <Badge variant="secondary">Chờ khách nhập mã</Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <OrderStatusSection
          title="Đơn đang vận chuyển"
          description="Các đơn đã thanh toán và đang được xử lý giao hàng."
          orders={shippingOrders}
          emptyMessage="Không có đơn hàng đang vận chuyển."
          statusLabel="Đang vận chuyển"
          statusClassName="text-sky-600"
        />
        <OrderStatusSection
          title="Đơn đã hoàn thành"
          description="Các đơn đã giao thành công và được tính vào doanh thu."
          orders={completedOrders}
          emptyMessage="Chưa có đơn hàng hoàn thành."
          statusLabel="Hoàn thành"
          statusClassName="text-emerald-600"
        />
      </div>

      <AdminProductManagement />
    </div>
  )
}

function OrderStatusSection({
  title,
  description,
  orders,
  emptyMessage,
  statusLabel,
  statusClassName,
}: {
  title: string
  description: string
  orders: Order[]
  emptyMessage: string
  statusLabel: string
  statusClassName: string
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/70 bg-muted/20 p-8 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y divide-border/60 rounded-xl border border-border/60 bg-card">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer.fullName} · {formatDateTime(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{formatVND(order.total)}</p>
                <p className={`text-xs font-medium ${statusClassName}`}>{statusLabel}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
