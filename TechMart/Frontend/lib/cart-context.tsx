"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { CartItem, Product } from "./types"

const STORAGE_KEY = "techmart_cart"

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        const nextQty = Math.min(existing.quantity + quantity, product.stock)
        return prev.map((item) => (item.productId === product.id ? { ...item, quantity: nextQty } : item))
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: Math.min(quantity, product.stock),
          stock: product.stock,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])

  const value = useMemo(
    () => ({ items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
