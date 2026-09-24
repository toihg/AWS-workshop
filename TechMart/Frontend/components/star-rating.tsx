import { StarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Đánh giá ${value} trên 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(value)
        return (
          <StarIcon
            key={i}
            aria-hidden
            className={cn("size-3.5", filled ? "fill-primary text-primary" : "fill-transparent text-muted-foreground")}
          />
        )
      })}
    </div>
  )
}
