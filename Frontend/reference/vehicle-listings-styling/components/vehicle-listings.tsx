import { Card } from "@/components/ui/card"
import { vehicles } from "@/lib/constants"

export function VehicleListings() {
  const formatMileage = (mileage: string) => {
    // Remove commas and convert to number
    const mileageNum = Number.parseInt(mileage.replace(/,/g, ""), 10)

    if (mileageNum >= 1000) {
      // Round down to nearest 100, then format as k
      const rounded = Math.floor(mileageNum / 100) * 100
      const thousands = rounded / 1000

      // If it's a whole number, show as "1k", otherwise "1.1k"
      if (thousands % 1 === 0) {
        return `${thousands}k`
      } else {
        return `${thousands.toFixed(1)}k`
      }
    }

    return mileage
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Featured Vehicles</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {vehicles.slice(0, 10).map((vehicle) => {
            return (
              <Card
                key={vehicle.id}
                className="group overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 border-border flex flex-col aspect-square bg-card p-0 gap-0 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex-[3] bg-muted/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 p-4 bg-card flex flex-col justify-center">
                  <p className="text-sm text-accent-foreground/80 mb-1 font-medium uppercase tracking-wide">
                    {vehicle.name}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{vehicle.price}*</span>
                    <span className="text-sm text-muted-foreground font-medium">
                      {formatMileage(vehicle.mileage)} mi
                    </span>
                  </div>
                </div>
                {/* </CHANGE> */}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
