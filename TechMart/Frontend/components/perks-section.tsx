import { HeadsetIcon, RadarIcon, ShieldCheckIcon, TruckIcon } from "lucide-react"

const PERKS = [
  {
    icon: TruckIcon,
    title: "Giao hàng nhanh",
    description: "Nhận hàng trong 2-4 ngày trên toàn quốc, miễn phí cho đơn từ 2.000.000đ.",
  },
  {
    icon: RadarIcon,
    title: "Theo dõi đơn hàng thời gian thực",
    description: "Xem từng bước xử lý đơn hàng: thanh toán, đóng gói, vận chuyển, giao thành công.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Bảo hành chính hãng",
    description: "Tất cả sản phẩm được bảo hành chính hãng 12 tháng, đổi trả trong 7 ngày.",
  },
  {
    icon: HeadsetIcon,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ tư vấn sẵn sàng hỗ trợ bạn chọn sản phẩm phù hợp nhất.",
  },
]

export function PerksSection() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {PERKS.map((perk) => (
          <div key={perk.title} className="flex flex-col gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <perk.icon className="size-5" />
            </span>
            <h3 className="font-medium">{perk.title}</h3>
            <p className="text-sm text-muted-foreground">{perk.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
