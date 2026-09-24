"use client"

import type { CartItem, CustomerInfo, Order, OrderEvent, OrderEventType, PaymentMethod } from "./types"

const ORDERS_KEY = "techmart_orders"
const EVENTS_KEY = "techmart_order_events"

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * The event sequence below simulates the AWS event-driven pipeline
 * (OrderCreated -> PaymentRequested -> PaymentCompleted -> InventoryReserved
 * -> NotificationSent -> OrderCompleted) entirely on the client with mock data,
 * since no backend is connected yet.
 */
const EVENT_SEQUENCE: OrderEventType[] = [
  "OrderCreated",
  "PaymentRequested",
  "PaymentCompleted",
  "InventoryReserved",
  "NotificationSent",
  "OrderCompleted",
]

export function getOrders(): Order[] {
  return readJSON<Order[]>(ORDERS_KEY, []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function getOrderById(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id)
}

export function getOrderEvents(orderId: string): OrderEvent[] {
  return readJSON<OrderEvent[]>(EVENTS_KEY, [])
    .filter((e) => e.orderId === orderId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

export function confirmBankTransfer(orderId: string): Order | undefined {
  const orders = readJSON<Order[]>(ORDERS_KEY, [])
  const order = orders.find((item) => item.id === orderId)
  if (!order || order.paymentMethod !== "BANK_TRANSFER") return order

  const updatedOrder = { ...order, paymentStatus: "CONFIRMED" as const, status: "PROCESSING" as const }
  writeJSON(
    ORDERS_KEY,
    orders.map((item) => (item.id === orderId ? updatedOrder : item)),
  )
  appendEvent({
    id: `evt-${Date.now().toString(36)}-payment-confirmed`,
    orderId,
    type: "PaymentCompleted",
    status: "done",
    timestamp: new Date().toISOString(),
  })
  return updatedOrder
}

export function saveBankTransferLast4(orderId: string, last4: string): Order | undefined {
  const orders = readJSON<Order[]>(ORDERS_KEY, [])
  const order = orders.find((item) => item.id === orderId)
  if (!order || order.paymentMethod !== "BANK_TRANSFER") return order

  const updatedOrder = { ...order, bankTransferLast4: last4 }
  writeJSON(
    ORDERS_KEY,
    orders.map((item) => (item.id === orderId ? updatedOrder : item)),
  )
  return updatedOrder
}

export function mergeServerOrder(order: Order): Order {
  const orders = readJSON<Order[]>(ORDERS_KEY, [])
  const exists = orders.some((item) => item.id === order.id)
  writeJSON(ORDERS_KEY, exists ? orders.map((item) => (item.id === order.id ? { ...item, ...order } : item)) : [...orders, order])
  return order
}

export function completeOrderPipeline(orderId: string): Order | undefined {
  const order = getOrderById(orderId)
  if (!order) return undefined

  const existingTypes = new Set(getOrderEvents(orderId).map((event) => event.type))
  EVENT_SEQUENCE.slice(1).forEach((type, index) => {
    if (!existingTypes.has(type)) {
      appendEvent({
        id: `evt-${Date.now().toString(36)}-complete-${index}`,
        orderId,
        type,
        status: "done",
        timestamp: new Date().toISOString(),
      })
    }
  })

  const completedOrder = { ...order, paymentStatus: "CONFIRMED" as const, status: "COMPLETED" as const }
  const orders = readJSON<Order[]>(ORDERS_KEY, [])
  writeJSON(ORDERS_KEY, orders.map((item) => (item.id === orderId ? completedOrder : item)))
  return completedOrder
}

function saveOrder(order: Order) {
  const orders = readJSON<Order[]>(ORDERS_KEY, [])
  writeJSON(ORDERS_KEY, [...orders, order])
}

function appendEvent(event: OrderEvent) {
  const events = readJSON<OrderEvent[]>(EVENTS_KEY, [])
  writeJSON(EVENTS_KEY, [...events, event])
}

function updateOrderStatus(orderId: string, status: Order["status"]) {
  const orders = readJSON<Order[]>(ORDERS_KEY, [])
  writeJSON(
    ORDERS_KEY,
    orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
  )
}

export function createOrder(items: CartItem[], customer: CustomerInfo, paymentMethod: PaymentMethod): Order {
  const id = `ORD-${Date.now().toString(36).toUpperCase()}`

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const shippingFee =
    subtotal >= 2_000_000 || subtotal === 0 ? 0 : 39_000

  const total = subtotal + shippingFee

  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    customer,
    paymentMethod,

    items: items.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      image: i.image,
      quantity: i.quantity,
      subtotal: i.price * i.quantity,
    })),

    subtotal,
    shippingFee,
    total,

    status: "PENDING",
    paymentStatus: paymentMethod === "BANK_TRANSFER" ? "PENDING" : "CONFIRMED",
  }
  saveOrder(order)

  appendEvent({
    id: `evt-${Date.now().toString(36)}-0`,
    orderId: id,
    type: "OrderCreated",
    status: "done",
    timestamp: new Date().toISOString(),
  })

  return order
}

/**
 * Simulates the downstream event-driven pipeline firing over time.
 * Call once after creating an order; each step appends an OrderEvent
 * and updates the Order status as the "pipeline" progresses.
 */
export function simulateOrderPipeline(orderId: string, onUpdate?: () => void) {
  const order = getOrderById(orderId)
  if (order?.paymentMethod === "BANK_TRANSFER") return

  const remaining = EVENT_SEQUENCE.slice(1)
  remaining.forEach((type, index) => {
    const delay = (index + 1) * 1200
    setTimeout(() => {
      appendEvent({
        id: `evt-${Date.now().toString(36)}-${index + 1}`,
        orderId,
        type,
        status: "done",
        timestamp: new Date().toISOString(),
      })
      if (type === "PaymentCompleted") {
        updateOrderStatus(orderId, "PROCESSING")
      }
      if (type === "OrderCompleted") {
        updateOrderStatus(orderId, "COMPLETED")
      }
      onUpdate?.()
    }, delay)
  })
}

export const ORDER_EVENT_SEQUENCE = EVENT_SEQUENCE
