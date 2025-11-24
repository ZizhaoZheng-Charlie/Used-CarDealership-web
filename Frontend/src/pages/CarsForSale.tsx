import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
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
  FileText,
  Grid3x3,
  List,
} from "lucide-react";
import { getVehicles, type Vehicle } from "@/lib/api";
import { EmailModal } from "@/components/EmailModal";

// Helper functions to extract vehicle information
const getMake = (name: string): string => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return parts[1]; // After year
  }
  return "";
};

const getModel = (name: string): string => {
  const parts = name.split(" ");
  if (parts.length >= 3) {
    return parts.slice(2).join(" "); // Everything after year and make
  }
  return "";
};

const getBodyStyle = (name: string): string => {
  const nameLower = name.toLowerCase();
  if (
    nameLower.includes("suv") ||
    nameLower.includes("cr-v") ||
    nameLower.includes("rav4") ||
    nameLower.includes("cx-5")
  ) {
    return "SUV";
  }
  if (
    nameLower.includes("truck") ||
    nameLower.includes("f-150") ||
    nameLower.includes("frontier")
  ) {
    return "Truck";
  }
  if (nameLower.includes("mustang") || nameLower.includes("coupe")) {
    return "Coupe";
  }
  if (
    nameLower.includes("sedan") ||
    nameLower.includes("series") ||
    nameLower.includes("accord") ||
    nameLower.includes("camry") ||
    nameLower.includes("a4")
  ) {
    return "Sedan";
  }
  if (nameLower.includes("hatchback")) {
    return "Hatchback";
  }
  if (nameLower.includes("convertible")) {
    return "Convertible";
  }
  if (nameLower.includes("wagon")) {
    return "Wagon";
  }
  if (nameLower.includes("van")) {
    return "Van";
  }
  return "Sedan"; // Default
};

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

// Helper function to extract trim from vehicle name
const getTrim = (name: string): string => {
  // Try to extract trim level (e.g., "Premium 2", "S", "LX", etc.)
  const parts = name.split(" ");
  // Common trim patterns: after model name
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
  // If no trim found, return empty or a default
  return "";
};

// Helper function to get body style description
const getBodyStyleDescription = (name: string): string => {
  const bodyStyle = getBodyStyle(name);
  const nameLower = name.toLowerCase();

  // Try to extract door count and body style
  if (nameLower.includes("4dr") || nameLower.includes("4-door")) {
    return `${bodyStyle} 4dr`;
  }
  if (nameLower.includes("2dr") || nameLower.includes("2-door")) {
    return `${bodyStyle} 2dr`;
  }
  return `${bodyStyle}`;
};

// Helper functions to generate default specs
const getEngine = (vehicle: Vehicle): string => {
  // Default engine based on vehicle type
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
  return "3.6L V6"; // Default
};

const getExteriorColor = (vehicle: Vehicle): string => {
  const imageName = vehicle.image.toLowerCase();
  if (imageName.includes("blue")) return "Blue";
  if (imageName.includes("red")) return "Red";
  if (imageName.includes("black")) return "Black";
  if (imageName.includes("gray") || imageName.includes("grey")) return "Gray";
  if (imageName.includes("white")) return "White";
  return "Silver"; // Default
};

const getInteriorColor = (): string => {
  return "N/A"; // Default as shown in image
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
  return "FWD"; // Default
};

const getFuelEconomy = (vehicle: Vehicle): string => {
  if (vehicle.fuel === "Electric") {
    return "N/A";
  }
  if (vehicle.fuel === "Hybrid") {
    return "40 city / 38 hwy";
  }
  // Default based on vehicle type
  const nameLower = vehicle.name.toLowerCase();
  if (nameLower.includes("truck") || nameLower.includes("f-150")) {
    return "17 city / 23 hwy";
  }
  return "17 city / 27 hwy"; // Default
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

function CompactVehicleCard({ vehicle }: { vehicle: Vehicle }) {
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
        <p className="text-base text-primary mb-1.5 font-medium">
          {vehicle.name}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            {vehicle.price.replace("*", "")}*
          </span>
          <span className="text-base text-foreground font-medium">
            {" "}
            <span className="text-muted-foreground">|</span>{" "}
            {formatMileage(vehicle.mileage)} mi.
          </span>
        </div>
      </div>
    </Card>
  );
}

function StandardVehicleCard({
  vehicle,
  onEmailClick,
}: {
  vehicle: Vehicle;
  onEmailClick?: (vehicle: Vehicle, buttonRect: DOMRect) => void;
}) {
  const navigate = useNavigate();
  const imageSrc =
    vehicle.image && vehicle.image !== "/placeholder.svg"
      ? vehicle.image
      : "/nophoto.png";

  const trim = getTrim(vehicle.name);
  const bodyStyleDesc = getBodyStyleDescription(vehicle.name);
  const engine = getEngine(vehicle);
  const exteriorColor = getExteriorColor(vehicle);
  const interiorColor = getInteriorColor();
  const drivetrain = getDrivetrain(vehicle);
  const fuelEconomy = getFuelEconomy(vehicle);
  const transmissionDisplay = getTransmissionDisplay(vehicle.transmission);

  return (
    <Card
      className="overflow-hidden border-border bg-card hover:shadow-lg transition-shadow p-0 cursor-pointer"
      onClick={() => navigate(`/inventory/${vehicle.id}`)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Section - Image, Apply for Financing */}
        <div className="w-full md:w-56 flex-shrink-0 flex flex-col">
          <div className="relative w-full h-48 bg-muted/30 overflow-hidden">
            <img
              src={imageSrc}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2 bg-card flex flex-col items-center justify-center">
            <Button
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground border border-border font-semibold text-sm py-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = "/finance";
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Apply for Financing
            </Button>
          </div>
        </div>

        {/* Middle Section - Name, Trim, Price, Mileage */}
        <div className="flex-1 p-3 border-l border-border flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-foreground mb-0.5">
            {vehicle.name}
          </h3>
          {trim && (
            <p className="text-lg font-bold text-foreground mb-0">{trim}</p>
          )}
          <p className="text-sm text-foreground mb-1">{bodyStyleDesc}</p>

          <div className="flex gap-3 items-start">
            <div className="flex flex-col">
              <span className="text-xs text-foreground mb-0">Price</span>
              <span className="text-xl font-bold text-foreground">
                {vehicle.price.replace("*", "")}
              </span>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="text-xs text-foreground mb-0">Mileage</span>
              <span className="text-xl font-bold text-foreground">
                {vehicle.mileage}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Specifications and Contact */}
        <div className="flex-1 p-3 border-l border-border flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-1">
            {/* Engine */}
            <div className="flex items-start gap-1">
              <Settings className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground mb-0">Engine</p>
                <p className="text-sm font-medium text-foreground">{engine}</p>
              </div>
            </div>

            {/* Exterior Color */}
            <div className="flex items-start gap-1">
              <Car className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground mb-0">Exterior Color</p>
                <p className="text-sm font-medium text-foreground">
                  {exteriorColor}
                </p>
              </div>
            </div>

            {/* Transmission */}
            <div className="flex items-start gap-1">
              <Gauge className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground mb-0">Transmission</p>
                <p className="text-sm font-medium text-foreground">
                  {transmissionDisplay}
                </p>
              </div>
            </div>

            {/* Interior Color */}
            <div className="flex items-start gap-1">
              <Car className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground mb-0">Interior Color</p>
                <p className="text-sm font-medium text-foreground">
                  {interiorColor}
                </p>
              </div>
            </div>

            {/* Drivetrain */}
            <div className="flex items-start gap-1">
              <Zap className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground mb-0">Drivetrain</p>
                <p className="text-sm font-medium text-foreground">
                  {drivetrain}
                </p>
              </div>
            </div>

            {/* Fuel Economy */}
            <div className="flex items-start gap-1">
              <Fuel className="h-4 w-4 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-foreground mb-0">Fuel Economy</p>
                <p className="text-sm font-medium text-foreground">
                  {fuelEconomy}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-1.5">
            <Button
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground border border-border font-semibold text-sm py-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = "tel:+12108645348";
              }}
            >
              <Phone className="h-4 w-4 mr-2" />
              (210) 864-5348
            </Button>
            <Button
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground border border-border font-semibold text-sm py-1.5"
              onClick={(e) => {
                e.stopPropagation();
                if (onEmailClick) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  onEmailClick(vehicle, rect);
                }
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function CarsForSale() {
  const [searchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [viewMode, setViewMode] = useState<"compact" | "standard">("standard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [bodyStyleFilter, setBodyStyleFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState("any");
  const [maxMileage, setMaxMileage] = useState("any");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [clickedEmailButtonRect, setClickedEmailButtonRect] =
    useState<DOMRect | null>(null);
  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);
  const [clickedTradeInButtonRect, setClickedTradeInButtonRect] =
    useState<DOMRect | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log("Fetching vehicles...");
        const data = await getVehicles();
        console.log("Vehicles fetched:", data);
        console.log("Number of vehicles:", data.length);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      }
    };
    fetchVehicles();
  }, []);

  // Read bodyStyle from URL query parameter on mount and when it changes
  useEffect(() => {
    const bodyStyleParam = searchParams.get("bodyStyle");
    if (bodyStyleParam) {
      setBodyStyleFilter(bodyStyleParam.toLowerCase());
    }
  }, [searchParams]);

  // Helper function to get stock number from vehicle ID
  const getStockNumber = (id: number): string => {
    return `${id.toString().padStart(7, "0")}`;
  };

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    console.log("Filtering vehicles. Total vehicles:", vehicles.length);
    let filtered = [...vehicles];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((vehicle) => {
        const stockNumber = getStockNumber(vehicle.id);
        return (
          vehicle.name.toLowerCase().includes(query) ||
          vehicle.year.includes(query) ||
          vehicle.mileage.includes(query) ||
          stockNumber.includes(query)
        );
      });
    }

    // Price range filter (legacy support)
    if (priceRange !== "all") {
      filtered = filtered.filter((vehicle) => {
        const price = parseInt(vehicle.price.replace(/[^0-9]/g, ""));
        switch (priceRange) {
          case "under-20k":
            return price < 20000;
          case "20k-30k":
            return price >= 20000 && price < 30000;
          case "30k-40k":
            return price >= 30000 && price < 40000;
          case "40k-50k":
            return price >= 40000 && price < 50000;
          case "over-50k":
            return price >= 50000;
          default:
            return true;
        }
      });
    }

    // Max Price filter
    if (maxPrice !== "any") {
      filtered = filtered.filter((vehicle) => {
        const price = parseInt(vehicle.price.replace(/[^0-9]/g, ""));
        const maxPriceNum = parseInt(maxPrice.replace(/[^0-9]/g, ""));
        return price <= maxPriceNum;
      });
    }

    // Condition filter
    if (conditionFilter !== "all") {
      filtered = filtered.filter((vehicle) => {
        const condition = getCondition(vehicle.year, vehicle.mileage);
        return condition.toLowerCase() === conditionFilter.toLowerCase();
      });
    }

    // Body Style filter
    if (bodyStyleFilter !== "all") {
      filtered = filtered.filter((vehicle) => {
        const bodyStyle = getBodyStyle(vehicle.name);
        return bodyStyle.toLowerCase() === bodyStyleFilter.toLowerCase();
      });
    }

    // Make filter
    if (makeFilter !== "all") {
      filtered = filtered.filter((vehicle) => {
        const make = getMake(vehicle.name);
        return make.toLowerCase() === makeFilter.toLowerCase();
      });
    }

    // Model filter
    if (modelFilter !== "all") {
      filtered = filtered.filter((vehicle) => {
        const model = getModel(vehicle.name);
        return model.toLowerCase() === modelFilter.toLowerCase();
      });
    }

    // Max Mileage filter
    if (maxMileage !== "any") {
      filtered = filtered.filter((vehicle) => {
        const mileage = parseInt(vehicle.mileage.replace(/,/g, ""));
        const maxMileageNum = parseInt(maxMileage.replace(/[^0-9]/g, ""));
        return mileage <= maxMileageNum;
      });
    }

    // Status filter (all vehicles are available by default)
    if (statusFilter !== "all") {
      // For now, all vehicles are available. This can be extended when status is added to vehicle data
      if (statusFilter === "sold") {
        filtered = [];
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            parseInt(a.price.replace(/[^0-9]/g, "")) -
            parseInt(b.price.replace(/[^0-9]/g, ""))
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            parseInt(b.price.replace(/[^0-9]/g, "")) -
            parseInt(a.price.replace(/[^0-9]/g, ""))
        );
        break;
      case "make-az":
        filtered.sort((a, b) => {
          const makeA = getMake(a.name).toLowerCase();
          const makeB = getMake(b.name).toLowerCase();
          return makeA.localeCompare(makeB);
        });
        break;
      case "make-za":
        filtered.sort((a, b) => {
          const makeA = getMake(a.name).toLowerCase();
          const makeB = getMake(b.name).toLowerCase();
          return makeB.localeCompare(makeA);
        });
        break;
      case "mileage-low":
        filtered.sort(
          (a, b) =>
            parseInt(a.mileage.replace(/,/g, "")) -
            parseInt(b.mileage.replace(/,/g, ""))
        );
        break;
      default:
        // Keep original order
        break;
    }

    console.log("Filtered vehicles count:", filtered.length);
    return filtered;
  }, [
    vehicles,
    searchQuery,
    sortBy,
    priceRange,
    conditionFilter,
    bodyStyleFilter,
    makeFilter,
    modelFilter,
    maxPrice,
    maxMileage,
    statusFilter,
  ]);

  // Pagination logic for standard mode
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = useMemo(() => {
    if (viewMode === "compact") {
      return filteredVehicles;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, currentPage, viewMode, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    sortBy,
    priceRange,
    conditionFilter,
    bodyStyleFilter,
    makeFilter,
    modelFilter,
    maxPrice,
    maxMileage,
    statusFilter,
  ]);

  // Get unique values for filters
  const availableMakes = useMemo(() => {
    const makes = Array.from(
      new Set(vehicles.map((v) => getMake(v.name)).filter((m) => m))
    ).sort();
    return makes;
  }, [vehicles]);

  const availableModels = useMemo(() => {
    const models = Array.from(
      new Set(vehicles.map((v) => getModel(v.name)).filter((m) => m))
    ).sort();
    return models;
  }, [vehicles]);

  const availableBodyStyles = useMemo(() => {
    const styles = Array.from(
      new Set(vehicles.map((v) => getBodyStyle(v.name)))
    ).sort();
    return styles;
  }, [vehicles]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setPriceRange("all");
    setConditionFilter("all");
    setBodyStyleFilter("all");
    setMakeFilter("all");
    setModelFilter("all");
    setMaxPrice("any");
    setMaxMileage("any");
    setStatusFilter("all");
    setSortBy("default");
  };

  const handleEmailClick = (vehicle: Vehicle, buttonRect: DOMRect) => {
    setSelectedVehicle(vehicle);
    setClickedEmailButtonRect(buttonRect);
    setIsEmailModalOpen(true);
  };

  const handleTradeInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickedTradeInButtonRect(rect);
    setIsTradeInModalOpen(true);
  };

  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                All Cars For Sale
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Browse our complete inventory of quality pre-owned vehicles
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="py-6 md:py-8 bg-card border-b border-border sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Input
                type="text"
                placeholder="Search by name, year, mileage, or stock number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold whitespace-nowrap"
                onClick={handleTradeInClick}
              >
                <Mail className="h-4 w-4 mr-2" />
                Value My Trade
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-8 md:py-12 pb-16 md:pb-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-card rounded-lg border border-border p-6 md:p-8 sticky top-50 max-h-[calc(100vh-10rem)] overflow-y-auto z-30">
                  <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-bold text-foreground">
                      Filter Inventory
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-primary hover:text-primary/80"
                    >
                      Clear
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Condition Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Condition
                      </label>
                      <Select
                        value={conditionFilter}
                        onValueChange={setConditionFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="like new">Like New</SelectItem>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Body Style Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Body Style
                      </label>
                      <Select
                        value={bodyStyleFilter}
                        onValueChange={setBodyStyleFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {availableBodyStyles.map((style) => (
                            <SelectItem key={style} value={style.toLowerCase()}>
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Make Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Make
                      </label>
                      <Select value={makeFilter} onValueChange={setMakeFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {availableMakes.map((make) => (
                            <SelectItem key={make} value={make.toLowerCase()}>
                              {make}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Model Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Model
                      </label>
                      <Select
                        value={modelFilter}
                        onValueChange={setModelFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {availableModels.map((model) => (
                            <SelectItem key={model} value={model.toLowerCase()}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Max Price Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Max Price
                      </label>
                      <Select value={maxPrice} onValueChange={setMaxPrice}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="10000">$10,000</SelectItem>
                          <SelectItem value="15000">$15,000</SelectItem>
                          <SelectItem value="20000">$20,000</SelectItem>
                          <SelectItem value="25000">$25,000</SelectItem>
                          <SelectItem value="30000">$30,000</SelectItem>
                          <SelectItem value="35000">$35,000</SelectItem>
                          <SelectItem value="40000">$40,000</SelectItem>
                          <SelectItem value="45000">$45,000</SelectItem>
                          <SelectItem value="50000">$50,000</SelectItem>
                          <SelectItem value="60000">$60,000</SelectItem>
                          <SelectItem value="75000">$75,000</SelectItem>
                          <SelectItem value="100000">$100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Max Mileage Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Max Mileage
                      </label>
                      <Select value={maxMileage} onValueChange={setMaxMileage}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="10000">10,000</SelectItem>
                          <SelectItem value="25000">25,000</SelectItem>
                          <SelectItem value="50000">50,000</SelectItem>
                          <SelectItem value="75000">75,000</SelectItem>
                          <SelectItem value="100000">100,000</SelectItem>
                          <SelectItem value="125000">125,000</SelectItem>
                          <SelectItem value="150000">150,000</SelectItem>
                          <SelectItem value="200000">200,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Available/Sold Filter */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-foreground">
                        Available/Sold
                      </label>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {/* Sort and Results Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {viewMode === "standard" && filteredVehicles.length > 0 ? (
                      <>
                        Showing{" "}
                        {Math.min(
                          (currentPage - 1) * itemsPerPage + 1,
                          filteredVehicles.length
                        )}
                        -
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredVehicles.length
                        )}{" "}
                        of {filteredVehicles.length} Vehicle
                        {filteredVehicles.length !== 1 ? "s" : ""} Available
                      </>
                    ) : (
                      <>
                        {filteredVehicles.length} Vehicle
                        {filteredVehicles.length !== 1 ? "s" : ""} Available
                      </>
                    )}
                  </h2>
                  <div className="flex items-center gap-3">
                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 border border-border rounded-md p-1">
                      <Button
                        variant={viewMode === "compact" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("compact")}
                        className="h-8 px-3"
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "standard" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("standard")}
                        className="h-8 px-3"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        Sort by:
                      </span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                          <SelectItem value="make-az">Make: A-Z</SelectItem>
                          <SelectItem value="make-za">Make: Z-A</SelectItem>
                          <SelectItem value="mileage-low">
                            Mileage: Low to High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Vehicle Listings */}
                {filteredVehicles.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">
                      No vehicles found matching your criteria.
                    </p>
                    <Button variant="outline" onClick={clearAllFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                ) : viewMode === "compact" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {filteredVehicles.map((vehicle) => (
                      <CompactVehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="space-y-6">
                      {paginatedVehicles.map((vehicle) => (
                        <StandardVehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          onEmailClick={handleEmailClick}
                        />
                      ))}
                    </div>
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                          }
                          disabled={currentPage === 1}
                          className="gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                          ).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            const showPage =
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1);

                            if (!showPage) {
                              // Show ellipsis
                              if (
                                page === currentPage - 2 ||
                                page === currentPage + 2
                              ) {
                                return (
                                  <span
                                    key={page}
                                    className="px-2 text-muted-foreground"
                                  >
                                    ...
                                  </span>
                                );
                              }
                              return null;
                            }

                            return (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="min-w-[40px]"
                              >
                                {page}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(totalPages, prev + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="gap-2"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Email Modal */}
      {selectedVehicle && (
        <EmailModal
          isOpen={isEmailModalOpen}
          onOpenChange={setIsEmailModalOpen}
          vehicleName={selectedVehicle.name}
          clickedButtonRect={clickedEmailButtonRect}
          onAnimationEnd={() => setClickedEmailButtonRect(null)}
        />
      )}

      {/* Trade-in Modal */}
      <EmailModal
        isOpen={isTradeInModalOpen}
        onOpenChange={setIsTradeInModalOpen}
        vehicleName=""
        clickedButtonRect={clickedTradeInButtonRect}
        onAnimationEnd={() => setClickedTradeInButtonRect(null)}
      />
    </>
  );
}
