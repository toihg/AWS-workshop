export type ProductCategory =
  | "MacBook"
  | "iPhone"
  | "iPad"
  | "AirPods"
  | "Apple Watch"

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: ProductCategory
  price: number
  image: string
  description: string
  stock: number
  rating: number
}

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

/**
 * Payment method selected by the customer.
 */
export type PaymentMethod =
  | "COD"
  | "BANK_TRANSFER"

/**
 * Customer information submitted during checkout.
 */
export interface CustomerInfo {
  fullName: string
  email: string
  phone: string
  address: string
  note?: string
}

/**
 * Item sent when creating an order.
 *
 * The frontend only sends productId and quantity.
 * The backend is responsible for getting the real price
 * from the database.
 */
export interface CreateOrderItem {
  productId: string
  quantity: number
}

/**
 * Request sent from frontend to backend.
 */
export interface CreateOrderRequest {
  customer: CustomerInfo
  paymentMethod: PaymentMethod
  items: CreateOrderItem[]
}

/**
 * Item returned by the backend in an order.
 */
export interface OrderItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  subtotal: number
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"

export type PaymentStatus = "PENDING" | "CONFIRMED"

export interface Order {
  id: string
  createdAt: string
  customer: CustomerInfo
  paymentMethod: PaymentMethod
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  total: number
  status: OrderStatus
  paymentStatus?: PaymentStatus
  bankTransferLast4?: string
}

export type OrderEventType =
  | "OrderCreated"
  | "PaymentRequested"
  | "PaymentCompleted"
  | "InventoryReserved"
  | "OrderCompleted"

export type OrderEventStatus =
  | "done"
  | "processing"
  | "pending"

export interface OrderEvent {
  id: string
  orderId: string
  type: OrderEventType
  status: OrderEventStatus
  timestamp: string
}

/**
 * Response returned by GET /products.
 */
export interface ProductListResponse {
  products: Product[]
}

/**
 * Response returned by GET /orders.
 */
export interface OrderListResponse {
  orders: Order[]
}

/**
 * Response returned by GET /orders/:id/events.
 */
export interface OrderEventsResponse {
  events: OrderEvent[]
}