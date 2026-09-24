import type { Order, Product } from "@/lib/types"

const API_URL = "http://18.140.192.116:8080/api"

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm")
  }

  return (await response.json()) as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((product) => product.slug === slug)
}

export interface RegisteredUser {
  id: string
  fullName: string
  email: string
  phone: string
}

export async function registerUser(
  fullName: string,
  email: string,
  phone: string,
  password: string,
): Promise<RegisteredUser> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, phone, password }),
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { detail?: string; message?: string } | null
    throw new Error(body?.detail ?? body?.message ?? "Không thể đăng ký tài khoản")
  }

  return (await response.json()) as RegisteredUser
}

export async function loginUser(identifier: string, password: string): Promise<RegisteredUser> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { detail?: string; message?: string } | null
    throw new Error(body?.detail ?? body?.message ?? "Email/số điện thoại hoặc mật khẩu không đúng")
  }

  return (await response.json()) as RegisteredUser
}

export async function loginAdmin(
  username: string,
  password: string
): Promise<{ username: string; role: string }> {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      detail?: string
      message?: string
    } | null

    throw new Error(
      body?.detail ??
      body?.message ??
      "Tài khoản hoặc mật khẩu admin không đúng"
    )
  }

  return (await response.json()) as {
    username: string
    role: string
  }
}

const ADMIN_HEADERS = { "X-Admin-Username": "ADMIN" }

export async function createBackendOrder(order: Order): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: order.id,
      fullName: order.customer.fullName,
      phone: order.customer.phone,
      email: order.customer.email,
      address: order.customer.address,
      note: order.customer.note,
      paymentMethod: order.paymentMethod,
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      total: order.total,
      items: order.items,
    }),
  })
  if (!response.ok) throw new Error("Không thể lưu đơn hàng lên hệ thống")
  return (await response.json()) as Order
}

export async function getBackendOrder(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${encodeURIComponent(id)}`, { cache: "no-store" })
  if (!response.ok) throw new Error("Không thể lấy trạng thái đơn hàng")
  return (await response.json()) as Order
}

export async function submitTransferReference(id: string, last4: string): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${encodeURIComponent(id)}/transfer-reference`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ last4 }),
  })
  if (!response.ok) throw new Error("Không thể gửi mã giao dịch")
  return (await response.json()) as Order
}

export async function getAdminOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders/admin`, { headers: ADMIN_HEADERS, cache: "no-store" })
  if (!response.ok) throw new Error("Không thể lấy danh sách đơn hàng admin")
  return (await response.json()) as Order[]
}

export async function confirmBackendPayment(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${encodeURIComponent(id)}/confirm-payment`, {
    method: "POST",
    headers: ADMIN_HEADERS,
  })
  if (!response.ok) throw new Error("Không thể xác nhận thanh toán")
  return (await response.json()) as Order
}