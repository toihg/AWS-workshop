"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeftIcon, CheckCircle2Icon, LandmarkIcon, WalletIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { formatVND } from "@/lib/format"
import { completeOrderPipeline, getOrderById, saveBankTransferLast4, simulateOrderPipeline } from "@/lib/order-store"
import { getBackendOrder, submitTransferReference } from "@/lib/api"
import { mergeServerOrder } from "@/lib/order-store"
import type { Order, PaymentMethod } from "@/lib/types"

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  COD: "Thanh toán khi nhận hàng (COD)",
  BANK_TRANSFER: "Chuyển khoản ngân hàng",
}

const PAYMENT_ICONS: Record<PaymentMethod, typeof WalletIcon> = {
  COD: WalletIcon,
  BANK_TRANSFER: LandmarkIcon,
}

export default function PaymentPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { clearCart } = useCart()
  const [order, setOrder] = useState<Order | null | undefined>(undefined)
  const [processing, setProcessing] = useState(false)
  const [transactionLast4, setTransactionLast4] = useState("")
  const [transactionError, setTransactionError] = useState("")

  useEffect(() => {
    let active = true
    async function load() {
      const found = getOrderById(params.id)
      if (found && active) setOrder(found)
      try {
        const serverOrder = await getBackendOrder(params.id)
        if (active) {
          mergeServerOrder(serverOrder)
          setOrder(serverOrder)
          if (serverOrder.paymentStatus === "CONFIRMED") {
            completeOrderPipeline(serverOrder.id)
            router.replace(`/orders/${serverOrder.id}`)
          }
        }
      } catch {
        if (!found && active) setOrder(null)
      }
    }
    load()
    return () => { active = false }
  }, [params.id])

  useEffect(() => {
    if (!order || order.paymentMethod !== "BANK_TRANSFER" || order.paymentStatus === "CONFIRMED") return
    const interval = setInterval(async () => {
      try {
        const serverOrder = await getBackendOrder(order.id)
        mergeServerOrder(serverOrder)
        setOrder(serverOrder)
        if (serverOrder.paymentStatus === "CONFIRMED") {
          completeOrderPipeline(serverOrder.id)
          router.replace(`/orders/${serverOrder.id}`)
        }
      } catch {
        // Keep showing the last known order while the backend is unavailable.
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [order])

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border/60 bg-card p-6 text-sm text-muted-foreground">
          Đang tải thông tin thanh toán...
        </div>
      </div>
    )
  }

  if (order === null) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Không tìm thấy đơn hàng</h1>
        <p className="mt-2 text-sm text-muted-foreground">Đơn hàng này không tồn tại hoặc đã bị xoá.</p>
        <Button render={<Link href="/orders" />} nativeButton={false} className="mt-6">
          Về danh sách đơn hàng
        </Button>
      </div>
    )
  }

  const Icon = PAYMENT_ICONS[order.paymentMethod]

  async function handlePayment() {
    if (processing) return
    if (order.paymentMethod === "BANK_TRANSFER") {
      if (!/^\d{4}$/.test(transactionLast4)) {
        setTransactionError("Vui lòng nhập đúng 4 chữ số cuối mã giao dịch.")
        return
      }
      try {
        const serverOrder = await submitTransferReference(order.id, transactionLast4)
        saveBankTransferLast4(order.id, transactionLast4)
        mergeServerOrder(serverOrder)
        setOrder(serverOrder)
        setProcessing(true)
        clearCart()
        return
      } catch (error) {
        setTransactionError(error instanceof Error ? error.message : "Không thể gửi mã giao dịch")
        return
      }
    }
    setProcessing(true)
    simulateOrderPipeline(order.id)
    clearCart()
    setTimeout(() => {
      router.push(`/orders/${order.id}`)
    }, 700)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/checkout" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Quay lại thanh toán
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2Icon className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bước 2/2</p>
              <h1 className="text-2xl font-semibold">Thanh toán</h1>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <Icon className="size-5 text-primary" />
              <div>
                <p className="font-medium">Phương thức thanh toán</p>
                <p className="text-sm text-muted-foreground">{PAYMENT_LABELS[order.paymentMethod]}</p>
              </div>
            </div>
          </div>

          {order.paymentMethod === "BANK_TRANSFER" && (
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="font-semibold">Thông tin tài khoản nhận tiền</p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div><dt className="text-muted-foreground">Ngân hàng</dt><dd className="font-medium">BIDV</dd></div>
                <div><dt className="text-muted-foreground">Số tài khoản</dt><dd className="font-medium">3510789501</dd></div>
                <div className="sm:col-span-2"><dt className="text-muted-foreground">Chủ tài khoản</dt><dd className="font-medium">Hoàng Văn Tới</dd></div>
              </dl>
              <p className="mt-3 text-sm text-muted-foreground">Sau khi chuyển khoản, nhập 4 số cuối mã giao dịch bên dưới.</p>
              <div className="mt-4 space-y-2">
                <Label htmlFor="transaction-last4">4 số cuối mã giao dịch</Label>
                <Input
                  id="transaction-last4"
                  inputMode="numeric"
                  maxLength={4}
                  value={transactionLast4}
                  onChange={(event) => {
                    setTransactionLast4(event.target.value.replace(/\D/g, "").slice(0, 4))
                    setTransactionError("")
                  }}
                  placeholder="Ví dụ: 1234"
                />
                {transactionError && <p className="text-sm text-red-500">{transactionError}</p>}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/50 p-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-secondary/40">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatVND(item.subtotal)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>

          <div className="mt-5 space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span className="text-foreground">{formatVND(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="text-foreground">{order.shippingFee === 0 ? "Miễn phí" : formatVND(order.shippingFee)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-semibold text-foreground">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatVND(order.total)}</span>
            </div>
          </div>

          {order.paymentStatus === "CONFIRMED" ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
              <p className="font-semibold">Thanh toán thành công</p>
              <p className="mt-1 text-sm">Admin đã xác nhận giao dịch. Đơn hàng đang được xử lý.</p>
            </div>
          ) : (
            <>
              {order.paymentMethod === "BANK_TRANSFER" && order.bankTransferLast4 ? (
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-700">
                  <p className="font-semibold">Đã gửi mã giao dịch ****{order.bankTransferLast4}</p>
                  <p className="mt-1 text-sm">Đang chờ admin xác nhận thanh toán.</p>
                </div>
              ) : <Button size="lg" className="mt-6 w-full" onClick={handlePayment} disabled={processing}>
                {processing
                  ? "Đang xử lý thanh toán..."
                  : order.paymentMethod === "BANK_TRANSFER"
                    ? "Tôi đã chuyển khoản"
                    : "Xác nhận thanh toán"}
              </Button>}

              <p className="mt-3 text-xs text-muted-foreground">
                {order.paymentMethod === "BANK_TRANSFER"
                  ? "Đơn hàng sẽ được xử lý sau khi admin kiểm tra và xác nhận giao dịch chuyển khoản."
                  : "Sau khi xác nhận, hệ thống sẽ tiếp tục xử lý đơn hàng và chuyển bạn đến trang theo dõi đơn hàng."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
