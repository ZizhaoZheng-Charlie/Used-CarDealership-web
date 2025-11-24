import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { getTestimonials, type Testimonial } from "@/lib/api";
import { useMemo, useRef, useEffect, useState } from "react";

export function TestimonialsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getTestimonials();
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  // Sort testimonials by most recent first (lowest sortOrder = most recent) and limit to 9
  const sortedTestimonials = useMemo(() => {
    return [...testimonials]
      .filter((t) => t.rating === 5) // Only show 5-star reviews
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, 9); // Limit to 9 most recent reviews
  }, [testimonials]);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = useMemo(() => {
    return [...sortedTestimonials, ...sortedTestimonials];
  }, [sortedTestimonials]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    let isPaused = false;
    const scrollSpeed = 0.3; // pixels per frame (slower for smoother effect)

    // Calculate actual card width dynamically
    const firstCard = container.querySelector<HTMLElement>(
      "div[data-testimonial-card]"
    );
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 424; // 400px + 24px gap
    const totalWidth = sortedTestimonials.length * cardWidth;

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed;

        // Reset position when we've scrolled through one set (seamless loop)
        if (scrollPosition >= totalWidth) {
          scrollPosition = 0;
        }

        container.style.transform = `translateX(-${scrollPosition}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sortedTestimonials.length]);

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See what our satisfied customers
              have to say about their experience with Auto Solution.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 will-change-transform"
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  data-testimonial-card
                  className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px]"
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-border flex flex-col h-full">
                    <CardContent className="p-0 flex flex-col flex-1">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="mb-4 flex-1">
                        <Quote className="h-8 w-8 text-primary/20 mb-3" />
                        <p className="text-muted-foreground leading-relaxed">
                          {testimonial.text}
                        </p>
                      </div>
                      <div className="border-t border-border pt-4 mt-auto">
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </div>
                        {testimonial.vehicle && (
                          <div className="text-sm text-primary mt-1">
                            Purchased: {testimonial.vehicle}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          {testimonial.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
