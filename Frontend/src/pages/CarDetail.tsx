import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { EmailModal } from "@/components/EmailModal";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Car,
  Gauge,
  Fuel,
  Zap,
  Phone,
  Mail,
  ArrowLeft,
  Award,
  X,
  Paintbrush,
  Sofa,
  ScanLine,
} from "lucide-react";
import { getVehicles, getVehicle, type Vehicle } from "@/lib/api";

const getCondition = (year: string, mileage: string): string => {
  const yearNum = parseInt(year);
  const mileageNum = parseInt(mileage.replace(/,/g, ""));
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearNum;

  if (age <= 1 && mileageNum < 15000) {
    return "Like New";
  }
  if (age <= 3 && mileageNum < 50000) {
    return "Excellent";
  }
  if (age <= 7 && mileageNum < 100000) {
    return "Good";
  }
  if (age <= 10 && mileageNum < 150000) {
    return "Fair";
  }
  return "Used";
};

const getTrim = (name: string): string => {
  const parts = name.split(" ");
  const trimIndicators = [
    "Premium",
    "Base",
    "S",
    "SE",
    "LE",
    "XLE",
    "LX",
    "EX",
    "Touring",
    "Sport",
  ];
  for (let i = 0; i < parts.length; i++) {
    if (trimIndicators.some((trim) => parts[i].includes(trim))) {
      return parts.slice(i).join(" ");
    }
  }
  return "";
};

const getEngine = (vehicle: Vehicle): string => {
  const nameLower = vehicle.name.toLowerCase();
  if (nameLower.includes("f-150") || nameLower.includes("truck")) {
    return "3.5L V6";
  }
  if (nameLower.includes("tesla") || vehicle.fuel === "Electric") {
    return "Electric";
  }
  if (nameLower.includes("cr-v") || nameLower.includes("rav4")) {
    return "2.5L I4";
  }
  if (nameLower.includes("bmw") || nameLower.includes("3 series")) {
    return "2.0L I4";
  }
  return "3.6L V6";
};

const getExteriorColor = (vehicle: Vehicle): string => {
  const imageName = vehicle.image.toLowerCase();
  if (imageName.includes("blue")) return "Blue";
  if (imageName.includes("red")) return "Red";
  if (imageName.includes("black")) return "Black";
  if (imageName.includes("gray") || imageName.includes("grey")) return "Gray";
  if (imageName.includes("white")) return "White";
  return "Silver";
};

const getInteriorColor = (): string => {
  return "N/A";
};

const getDrivetrain = (vehicle: Vehicle): string => {
  const nameLower = vehicle.name.toLowerCase();
  if (
    nameLower.includes("4x4") ||
    nameLower.includes("awd") ||
    nameLower.includes("4wd")
  ) {
    return "AWD";
  }
  if (nameLower.includes("rwd") || nameLower.includes("rear")) {
    return "RWD";
  }
  return "FWD";
};

const getTransmissionDisplay = (transmission: string): string => {
  if (transmission.toLowerCase().includes("automatic")) {
    return "Automatic 6-Speed";
  }
  if (transmission.toLowerCase().includes("manual")) {
    return "Manual 6-Speed";
  }
  return transmission;
};

const getStockNumber = (id: number): string => {
  return `${id.toString().padStart(7, "0")}`;
};

const getVIN = (id: number, year: string): string => {
  const yearCode = year.slice(-1);
  const idCode = id.toString().padStart(6, "0");
  return `3KPF24AD2LE${yearCode}${idCode}`;
};

const getFuelEconomyCity = (vehicle: Vehicle): string => {
  if (vehicle.fuel === "Electric") {
    return "N/A";
  }
  if (vehicle.fuel === "Hybrid") {
    return "40";
  }
  const nameLower = vehicle.name.toLowerCase();
  if (nameLower.includes("truck") || nameLower.includes("f-150")) {
    return "17";
  }
  return "17";
};

const getFuelEconomyHwy = (vehicle: Vehicle): string => {
  if (vehicle.fuel === "Electric") {
    return "N/A";
  }
  if (vehicle.fuel === "Hybrid") {
    return "38";
  }
  const nameLower = vehicle.name.toLowerCase();
  if (nameLower.includes("truck") || nameLower.includes("f-150")) {
    return "23";
  }
  return "27";
};

const getFeatures = (): string[] => {
  const features: string[] = [
    "Air Conditioning",
    "Power Windows",
    "Power Locks",
    "Power Steering",
    "Tilt Wheel",
    "AM/FM CD/MP3",
    "Satellite",
    "Keyless Entry",
    "Alarm",
    "Daytime Running Lights",
    "Dual Front Airbags",
    "Side Airbags",
    "Head Airbags",
    "Rear Head Airbags",
    "Active Seatbelts",
    "All Wheel ABS",
  ];
  return features;
};

export function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [clickedImageRect, setClickedImageRect] = useState<DOMRect | null>(
    null
  );
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [clickedEmailButtonRect, setClickedEmailButtonRect] =
    useState<DOMRect | null>(null);

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Fetch vehicle from API
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      const data = await getVehicle(parseInt(id));
      setVehicle(data);
    };
    fetchVehicle();
  }, [id]);

  if (!vehicle) {
    return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Vehicle Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The vehicle you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/cars-for-sale")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const hasMultipleImages = vehicle.images && vehicle.images.length > 0;
  const displayImages = hasMultipleImages ? vehicle.images! : [vehicle.image];
  const totalImages = displayImages.length;

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setModalImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setModalImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, totalImages]);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const openModal = (index: number, event?: React.MouseEvent<HTMLElement>) => {
    setModalImageIndex(index);

    // Get the clicked image element's position
    if (event) {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      setClickedImageRect(rect);
    } else {
      // Fallback: try to get position from ref
      const imageElement = imageRefs.current.get(index);
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        setClickedImageRect(rect);
      } else {
        // Default to center if we can't find the element
        setClickedImageRect(null);
      }
    }

    setIsModalOpen(true);
  };

  const goToPreviousModal = () => {
    setModalImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const goToNextModal = () => {
    setModalImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const modalImageSrc =
    displayImages[modalImageIndex] &&
    displayImages[modalImageIndex] !== "/placeholder.svg"
      ? displayImages[modalImageIndex]
      : "/nophoto.png";

  const currentImage = displayImages[currentImageIndex];
  const imageSrc =
    currentImage && currentImage !== "/placeholder.svg"
      ? currentImage
      : "/nophoto.png";

  const trim = getTrim(vehicle.name);
  const condition = getCondition(vehicle.year, vehicle.mileage);
  const engine = getEngine(vehicle);
  const exteriorColor = getExteriorColor(vehicle);
  const interiorColor = getInteriorColor();
  const drivetrain = getDrivetrain(vehicle);
  const fuelEconomyCity = getFuelEconomyCity(vehicle);
  const fuelEconomyHwy = getFuelEconomyHwy(vehicle);
  const transmissionDisplay = getTransmissionDisplay(vehicle.transmission);
  const stockNumber = getStockNumber(vehicle.id);
  const vin = getVIN(vehicle.id, vehicle.year);
  const features = getFeatures();

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/cars-for-sale")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inventory
          </Button>

          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left: Title and Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {vehicle.badge && (
                      <>
                        <Award className="h-5 w-5 text-primary" />
                        <span className="text-sm font-semibold text-primary">
                          {vehicle.badge}
                        </span>
                      </>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {vehicle.name}
                  </h1>
                  {trim && (
                    <p className="text-xl font-semibold text-foreground mb-1">
                      {trim}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div>
                      <span className="text-2xl md:text-3xl font-bold text-foreground">
                        {vehicle.price.replace("*", "")}
                      </span>
                    </div>
                    <div className="text-muted-foreground">•</div>
                    <div>
                      <span className="text-lg font-semibold text-foreground">
                        {vehicle.mileage} miles
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Stock #{stockNumber}</span>
                    <span>•</span>
                    <span className="font-mono">VIN {vin}</span>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
                    onClick={() => {
                      window.location.href = "tel:+12108645348";
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    (210) 864-5348
                  </Button>
                  <Button
                    variant="outline"
                    className="font-semibold"
                    onClick={(e) => {
                      const target = e.currentTarget;
                      const rect = target.getBoundingClientRect();
                      setClickedEmailButtonRect(rect);
                      setIsEmailModalOpen(true);
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content: Images */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Left Column - Main Image (60-70%) */}
              <div className="w-full lg:w-[65%]">
                <Card className="overflow-hidden border-border bg-card p-0">
                  <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden">
                    <button
                      onClick={(e) => openModal(currentImageIndex, e)}
                      className="w-full h-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="View full size image"
                    >
                      <img
                        ref={(el) => {
                          if (el) imageRefs.current.set(currentImageIndex, el);
                        }}
                        src={imageSrc}
                        alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </button>

                    {/* Navigation Arrows */}
                    {totalImages > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-10"
                          onClick={goToPrevious}
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm z-10"
                          onClick={goToNext}
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    {totalImages > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        {currentImageIndex + 1} / {totalImages}
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Right Column - Thumbnail Gallery Grid (30-35%) */}
              <div className="w-full lg:w-[35%]">
                <Card className="p-4 border-border bg-card h-full">
                  <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto scrollbar-thin">
                    {displayImages.map((img, index) => {
                      const thumbSrc =
                        img && img !== "/placeholder.svg"
                          ? img
                          : "/nophoto.png";
                      return (
                        <button
                          key={index}
                          onClick={(e) => {
                            setCurrentImageIndex(index);
                            openModal(index, e);
                          }}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            currentImageIndex === index
                              ? "border-primary ring-2 ring-primary/50"
                              : "border-border opacity-70 hover:opacity-100 hover:border-primary/50"
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img
                            ref={(el) => {
                              if (el) imageRefs.current.set(index, el);
                            }}
                            src={thumbSrc}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>

            {/* Vehicle Information and Features - Side by Side */}
            <div className="mt-8 flex flex-col lg:flex-row gap-6">
              {/* Vehicle Information Panel */}
              <div className="flex-1">
                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Vehicle Info
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      Stock {stockNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {/* Condition */}
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Condition{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {condition}
                        </span>
                      </div>
                    </div>

                    {/* Engine */}
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Engine{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {engine}
                        </span>
                      </div>
                    </div>

                    {/* Transmission */}
                    <div className="flex items-center gap-3">
                      <Gauge className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Transmission{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {transmissionDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Drivetrain */}
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Drivetrain{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {drivetrain}
                        </span>
                      </div>
                    </div>

                    {/* Fuel */}
                    <div className="flex items-center gap-3">
                      <Fuel className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Fuel{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {vehicle.fuel}
                        </span>
                      </div>
                    </div>

                    {/* Exterior Color */}
                    <div className="flex items-center gap-3">
                      <Paintbrush className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Exterior Color{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {exteriorColor}
                        </span>
                      </div>
                    </div>

                    {/* Interior Color */}
                    <div className="flex items-center gap-3">
                      <Sofa className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          Interior Color{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {interiorColor}
                        </span>
                      </div>
                    </div>

                    {/* VIN */}
                    <div className="flex items-center gap-3">
                      <ScanLine className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground">
                          VIN{" "}
                        </span>
                        <span className="text-sm font-semibold text-foreground font-mono break-all">
                          {vin}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border my-4"></div>

                  {/* Fuel Economy */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      Fuel Economy
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          CITY
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {fuelEconomyCity}
                        </p>
                      </div>
                      <Fuel className="h-6 w-6 text-primary mx-4" />
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          HWY
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {fuelEconomyHwy}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Features Section */}
              <div className="flex-1">
                <Card className="p-6 border-border bg-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-destructive rounded"></div>
                    <h2 className="text-xl font-bold text-foreground">
                      Features
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-destructive">•</span>
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className={`max-w-7xl w-[95vw] h-[95vh] p-0 bg-background/95 backdrop-blur-sm border-border [&>button]:hidden flex flex-col [&]:!animate-none ${
            clickedImageRect
              ? "animate-image-pop-out-from-position"
              : "animate-image-pop-out"
          }`}
          style={
            clickedImageRect
              ? ({
                  "--origin-x": `${
                    clickedImageRect.left + clickedImageRect.width / 2
                  }px`,
                  "--origin-y": `${
                    clickedImageRect.top + clickedImageRect.height / 2
                  }px`,
                } as React.CSSProperties)
              : undefined
          }
          onAnimationEnd={() => setClickedImageRect(null)}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 rounded-full bg-background/80 hover:bg-background border border-border shadow-lg"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Main Image Area - 75% */}
          <div className="relative flex-[0.75] flex items-center justify-center bg-muted/30 overflow-hidden">
            {/* Previous button */}
            {totalImages > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 hover:bg-background border border-border shadow-lg"
                onClick={goToPreviousModal}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Next button */}
            {totalImages > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-background/80 hover:bg-background border border-border shadow-lg"
                onClick={goToNextModal}
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Full-size image */}
            <img
              src={modalImageSrc}
              alt={`${vehicle.name} - Image ${modalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Gallery Carousel - 25% */}
          <div className="flex-[0.25] bg-card border-t border-border p-4 overflow-hidden">
            <div className="h-full flex flex-col gap-2">
              {/* Image counter */}
              {totalImages > 1 && (
                <div className="text-center text-foreground text-sm font-medium mb-2">
                  Image {modalImageIndex + 1} of {totalImages}
                </div>
              )}

              {/* Thumbnail carousel */}
              <div className="flex-1 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {displayImages.map((img, index) => {
                  const thumbSrc =
                    img && img !== "/placeholder.svg" ? img : "/nophoto.png";
                  return (
                    <button
                      key={index}
                      onClick={() => setModalImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 transition-all ${
                        modalImageIndex === index
                          ? "border-primary ring-2 ring-primary/50 scale-105"
                          : "border-border opacity-60 hover:opacity-100 hover:border-primary/50"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={thumbSrc}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onOpenChange={setIsEmailModalOpen}
        vehicleName={vehicle.name}
        clickedButtonRect={clickedEmailButtonRect}
        onAnimationEnd={() => setClickedEmailButtonRect(null)}
      />
    </main>
  );
}
