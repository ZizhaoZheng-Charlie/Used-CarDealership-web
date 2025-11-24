import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/Tooltip";
import { getBackgroundImages } from "@/lib/api";
import { imageContent } from "@/lib/constants";

export function SearchSection() {
  const [translateX, setTranslateX] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const images = await getBackgroundImages();
      setBackgroundImages(images);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (backgroundImages.length === 0 || imageContent.length === 0) return;

    const interval = setInterval(() => {
      const prevIndex = currentIndexRef.current;
      const nextIndex = (prevIndex + 1) % backgroundImages.length;
      const imageWidthPercent = 100 / (backgroundImages.length * 2);

      // Start image transition and text change simultaneously
      currentIndexRef.current = nextIndex;

      // Fade out current text
      setTextOpacity(0);

      // Update text content and fade in at the same time as image transition
      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setTextOpacity(1);
      }, 100); // Brief delay to allow fade out, then show new text

      // If wrapping from last to first, continue to duplicate set then reset
      if (nextIndex === 0 && prevIndex === backgroundImages.length - 1) {
        // First, animate to duplicate image 0 position
        setTranslateX(-backgroundImages.length * imageWidthPercent);
        // Then instantly reset to first set (seamless - user won't notice)
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "none";
            setTranslateX(0);
            // Re-enable transition for next cycle
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.style.transition = "";
              }
            }, 50);
          }
        }, 1000); // After transition completes
      } else {
        if (containerRef.current) {
          containerRef.current.style.transition = "";
        }
        setTranslateX(-nextIndex * imageWidthPercent);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length, imageContent.length]);

  return (
    <section className="container mx-auto px-4 pt-4 pb-2 md:pb-6">
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden rounded-3xl md:rounded-[2rem]">
        <div className="absolute inset-0 overflow-hidden rounded-3xl md:rounded-[2rem]">
          <div
            ref={containerRef}
            className="absolute inset-y-0 left-0 flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${translateX}%)`,
              width: `${backgroundImages.length * 2 * 100}%`,
              height: "100%",
            }}
          >
            {/* Duplicate images for seamless loop */}
            {[...backgroundImages, ...backgroundImages].map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-cover bg-center rounded-3xl md:rounded-[2rem]"
                style={{
                  backgroundImage: `url(${image})`,
                  width: `${100 / (backgroundImages.length * 2)}%`,
                  height: "100%",
                }}
              ></div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/40 rounded-3xl md:rounded-[2rem]"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 text-left pt-60 md:pt-70 lg:pt-80">
              <div className="flex items-center gap-4 md:gap-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      src="/badge.64b02661.png"
                      alt="Best Used Car Dealership in San Antonio by Expertise.com"
                      className="h-20 md:h-24 lg:h-28 w-auto flex-shrink-0 cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    sideOffset={12}
                    className="bg-white p-2 border border-gray-200 shadow-xl"
                  >
                    <img
                      src="/badge.64b02661.png"
                      alt="Best Used Car Dealership in San Antonio by Expertise.com"
                      className="h-64 w-auto"
                    />
                  </TooltipContent>
                </Tooltip>
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <h1
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight transition-opacity duration-500"
                    style={{ opacity: textOpacity }}
                  >
                    {imageContent[currentImageIndex]?.heading || ""}
                  </h1>
                  <p
                    className="text-sm md:text-base lg:text-lg text-blue-50/90 font-normal leading-relaxed transition-opacity duration-500"
                    style={{ opacity: textOpacity }}
                  >
                    {imageContent[currentImageIndex]?.subheading || ""}
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-900 font-semibold text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105"
              >
                <Search className="mr-2 h-5 w-5" />
                Search cars
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
