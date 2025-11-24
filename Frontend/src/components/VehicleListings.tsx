import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getVehicles, type Vehicle } from "@/lib/api";

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formatMileage = (mileage: string) => {
    const mileageNum = parseInt(mileage.replace(/,/g, ""), 10);

    if (mileageNum >= 1000) {
      const rounded = Math.floor(mileageNum / 100) * 100;
      const thousands = rounded / 1000;

      if (thousands % 1 === 0) {
        return `${thousands}k`;
      } else {
        return `${thousands.toFixed(1)}k`;
      }
    }

    return mileage;
  };

  const hasMultipleImages = vehicle.images && vehicle.images.length > 0;
  const displayImages = hasMultipleImages ? vehicle.images! : [vehicle.image];
  const totalImages = displayImages.length;
  const isLastImage =
    hasMultipleImages && currentImageIndex === totalImages - 1;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const currentImage = displayImages[currentImageIndex];
  const imageSrc =
    currentImage && currentImage !== "/placeholder.svg"
      ? currentImage
      : "/nophoto.png";

  return (
    <Card
      className="group overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 border-border flex flex-col aspect-square bg-card p-0 gap-0 cursor-pointer hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/inventory/${vehicle.id}`)}
    >
      <div className="flex-[3] bg-muted/30 overflow-hidden relative">
        <div className="relative w-full h-full">
          <img
            src={imageSrc}
            alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLastImage ? "blur-md" : "group-hover:scale-110"
            }`}
          />
          {isLastImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-30">
              <span className="text-white text-lg font-semibold drop-shadow-lg">
                View More Details
              </span>
            </div>
          )}
        </div>

        {/* Navigation Arrows - Only show on hover and if multiple images */}
        {hasMultipleImages && totalImages > 1 && (
          <>
            {/* Left Arrow - Only show if not on first image */}
            {currentImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className={`absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-opacity duration-300 z-40 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            {/* Right Arrow - Only show if not on last image */}
            {!isLastImage && (
              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-opacity duration-300 z-40 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </>
        )}

        {/* View More Details Button - Only show for single image vehicles */}
        {(!hasMultipleImages || totalImages === 1) && (
          <div
            className={`absolute bottom-2 left-2 right-2 transition-opacity duration-300 z-40 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="default"
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/inventory/${vehicle.id}`);
              }}
            >
              View More Details
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 bg-card flex flex-col justify-center">
        <p className="text-base text-blue-600 mb-1.5 font-medium">
          {vehicle.name}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-black">
            {vehicle.price.replace("*", "")}*
          </span>
          <span className="text-base text-black font-medium">
            {" "}
            <span className="text-gray-500">|</span>{" "}
            {formatMileage(vehicle.mileage)} mi.
          </span>
        </div>
      </div>
    </Card>
  );
}

export function VehicleListings() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const data = await getVehicles();
      setVehicles(data);
    };
    fetchVehicles();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Featured Vehicles
          </h2>
          <Button
            variant="outline"
            onClick={() => navigate("/cars-for-sale")}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View Inventory
          </Button>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Currently no cars for sale
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {vehicles.slice(0, 6).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
