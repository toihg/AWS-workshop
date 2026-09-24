"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LandmarkIcon, WalletIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { createOrder } from "@/lib/order-store"
import { createBackendOrder } from "@/lib/api"
import { formatVND } from "@/lib/format"
import type { PaymentMethod } from "@/lib/types"

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: typeof WalletIcon }[] = [
  { value: "COD", label: "Thanh toán khi nhận hàng (COD)", icon: WalletIcon },
  { value: "BANK_TRANSFER", label: "Chuyển khoản ngân hàng", icon: LandmarkIcon },
]

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const router = useRouter()
  const [payment, setPayment] = useState<PaymentMethod>("COD")
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", address: "", note: "" })

  const shipping = subtotal >= 2_000_000 || subtotal === 0 ? 0 : 39_000
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold">Giỏ hàng của bạn đang trống</h1>
        <p className="mt-2 text-sm text-muted-foreground">Hãy thêm sản phẩm trước khi tiến hành thanh toán.</p>
        <Button render={<Link href="/products" />} nativeButton={false} className="mt-6">
          Khám phá sản phẩm
        </Button>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.fullName || !form.phone || !form.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng")
      return
    }
    setSubmitting(true)
    const order = createOrder(items, form, payment)
    try {
      await createBackendOrder(order)
      toast.success("Đặt hàng thành công!")
      router.push(`/payment/${order.id}`)
    } catch {
      setSubmitting(false)
      toast.error("Không thể tạo đơn hàng. Vui lòng thử lại.")
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="font-semibold">Thông tin giao hàng</h2>
            <FieldGroup className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="fullName">Họ và tên</FieldLabel>
                  <Input
                    id="fullName"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    placeholder="Nguyễn Văn A"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="09xxxxxxxx"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email (không bắt buộc)</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="ban@email.com"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="address">Địa chỉ nhận hàng</FieldLabel>
                <Textarea
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="note">Ghi chú (không bắt buộc)</FieldLabel>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder="Ghi chú cho đơn hàng..."
                />
              </Field>
            </FieldGroup>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="font-semibold">Phương thức thanh toán</h2>
            <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="mt-4 gap-3">
              {PAYMENT_OPTIONS.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-3 text-sm font-normal hover:border-primary/40 [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <option.icon className="size-4 text-primary" />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5">
          <h2 className="font-semibold">Đơn hàng của bạn</h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border/60 bg-secondary/40">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1.5" />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {item.quantity}
                  </span>
                </div>
                <span className="flex-1 truncate text-sm">{item.name}</span>
                <span className="text-sm font-medium">{formatVND(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tạm tính</span>
            <span>{formatVND(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phí vận chuyển</span>
            <span>{shipping === 0 ? "Miễn phí" : formatVND(shipping)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span>Tổng cộng</span>
            <span className="text-primary">{formatVND(total)}</span>
          </div>
          <Button size="lg" type="submit" disabled={submitting} className="mt-2">
            {submitting ? "Đang xử lý..." : "Đặt hàng"}
          </Button>
        </div>
      </form>
    </div>
  )
}
