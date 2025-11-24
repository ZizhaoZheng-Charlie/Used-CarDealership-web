import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";
import { getTestimonials, type Testimonial } from "@/lib/api";
import { useMemo, useEffect, useState } from "react";

export function Testimonials() {
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
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              What Our Customers Say
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Don't just take our word for it. See what our satisfied customers
              have to say about their experience with Auto Solution.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Customer Testimonials
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real experiences from real customers
              </p>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTestimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="p-6 hover:shadow-lg transition-shadow duration-300 border-border flex flex-col"
                >
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  4.9
                </div>
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  5,000+
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  98%
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Satisfaction Rate
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  10,000+
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  Vehicles Sold
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Join Our Happy Customers?
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our inventory and find your perfect vehicle today. We're
              here to help you every step of the way.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Our Inventory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
