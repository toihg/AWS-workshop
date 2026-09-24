import type { Product } from "./types"

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "nimbus-pro-14",
    name: "Nimbus Pro 14",
    brand: "Nimbus",
    category: "MacBook",
    price: 32900000,
    image: "/images/products/laptop-nimbus-pro-14.png",
    description:
      "Ultrabook 14 inch mỏng nhẹ với chip xử lý thế hệ mới, màn hình OLED 2.8K, thời lượng pin lên đến 18 giờ. Phù hợp cho công việc văn phòng, thiết kế và học tập.",
    stock: 12,
    rating: 4.8,
  },
  {
    id: "p-002",
    slug: "vector-16-studio",
    name: "Vector 16 Studio",
    brand: "Vector",
    category: "MacBook",
    price: 45500000,
    image: "/images/products/laptop-vector-16.png",
    description:
      "Laptop hiệu năng cao 16 inch dành cho gaming và sáng tạo nội dung, card đồ họa rời mạnh mẽ, hệ thống tản nhiệt kép, bàn phím RGB per-key.",
    stock: 7,
    rating: 4.7,
  },
  {
    id: "p-003",
    slug: "nimbus-air-13",
    name: "Nimbus Air 13",
    brand: "Nimbus",
    category: "MacBook",
    price: 24900000,
    image: "/images/products/laptop-nimbus-air-13.png",
    description:
      "Laptop siêu mỏng 13 inch, trọng lượng chỉ 990g, thiết kế nhôm nguyên khối, lý tưởng cho di chuyển thường xuyên.",
    stock: 20,
    rating: 4.6,
  },
  {
    id: "p-004",
    slug: "aurora-x5",
    name: "Aurora X5",
    brand: "Aurora",
    category: "iPhone",
    price: 22900000,
    image: "/images/products/phone-aurora-x5.png",
    description:
      "Flagship smartphone với camera 3 ống kính 50MP, màn hình AMOLED 120Hz, chip xử lý hàng đầu, sạc nhanh 65W.",
    stock: 25,
    rating: 4.9,
  },
  {
    id: "p-005",
    slug: "aurora-mini",
    name: "Aurora Mini",
    brand: "Aurora",
    category: "iPhone",
    price: 14900000,
    image: "/images/products/phone-aurora-mini.png",
    description:
      "Smartphone nhỏ gọn, vừa vặn trong lòng bàn tay nhưng không thỏa hiệp về hiệu năng. Camera kép 48MP, pin 4200mAh.",
    stock: 30,
    rating: 4.5,
  },
  {
    id: "p-006",
    slug: "aurora-fold",
    name: "Aurora Fold",
    brand: "Aurora",
    category: "iPhone",
    price: 41900000,
    image: "/images/products/phone-aurora-fold.png",
    description:
      "Điện thoại màn hình gập cao cấp, mở ra thành máy tính bảng 7.6 inch, bản lề siêu bền, camera Zoom quang học 5x.",
    stock: 6,
    rating: 4.7,
  },
  {
    id: "p-007",
    slug: "slate-pad-11",
    name: "Slate Pad 11",
    brand: "Slate",
    category: "iPad",
    price: 16900000,
    image: "/images/products/tablet-slate-pad-11.png",
    description:
      "Máy tính bảng 11 inch màn hình Liquid Retina, hỗ trợ bút cảm ứng, lý tưởng cho vẽ, ghi chú và giải trí.",
    stock: 18,
    rating: 4.6,
  },
  {
    id: "p-008",
    slug: "pulse-buds-pro",
    name: "Pulse Buds Pro",
    brand: "Pulse",
    category: "AirPods",
    price: 4590000,
    image: "/images/products/audio-pulse-buds-pro.png",
    description:
      "Tai nghe true wireless chống ồn chủ động ANC, âm thanh Hi-Res, thời gian nghe 30 giờ kèm hộp sạc.",
    stock: 40,
    rating: 4.6,
  },
  {
    id: "p-009",
    slug: "aero-headphones",
    name: "Aero Headphones",
    brand: "Aero",
    category: "AirPods",
    price: 6890000,
    image: "/images/products/audio-aero-headphones.png",
    description:
      "Tai nghe chụp tai over-ear cao cấp, đệm tai memory foam, chống ồn chủ động, kết nối Bluetooth 5.3.",
    stock: 15,
    rating: 4.8,
  },
  {
    id: "p-010",
    slug: "pulse-watch-se",
    name: "Pulse Watch SE",
    brand: "Pulse",
    category: "Apple Watch",
    price: 5490000,
    image: "/images/products/wearable-pulse-watch-se.png",
    description:
      "Đồng hồ thông minh theo dõi sức khỏe, đo nhịp tim, SpO2, GPS tích hợp, pin 7 ngày, chống nước 5ATM.",
    stock: 22,
    rating: 4.5,
  },
]

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id)
}

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)))
