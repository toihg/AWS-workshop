"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types"

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Không thể tải sản phẩm");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-xl border bg-white p-4 shadow-sm"
        >
          <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-gray-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-gray-400">
                Chưa có hình ảnh
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">
            {product.brand}
          </p>

          <h3 className="mt-1 font-semibold">
            {product.name}
          </h3>

          <p className="mt-2 text-lg font-bold">
            {product.price.toLocaleString("vi-VN")} ₫
          </p>

          <p className="mt-1 text-sm text-gray-500">
            ⭐ {product.rating}
          </p>
        </div>
      ))}
    </div>
  );
}