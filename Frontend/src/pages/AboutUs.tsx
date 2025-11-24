import {
  Award,
  Users,
  Heart,
  Shield,
  TrendingUp,
  Clock,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Your satisfaction is our top priority. We go above and beyond to ensure every customer has an exceptional experience.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We believe in honest, transparent dealings. Every vehicle comes with a free history report and competitive pricing.",
  },
  {
    icon: TrendingUp,
    title: "Quality Assurance",
    description:
      "Every vehicle in our inventory is carefully inspected and certified to meet our high standards of quality.",
  },
  {
    icon: Clock,
    title: "Fast & Convenient",
    description:
      "We understand your time is valuable. Our streamlined process gets you on the road quickly and efficiently.",
  },
];

const stats = [
  { label: "Years in Business", value: "6+" },
  { label: "Happy Customers", value: "5,000+" },
  { label: "Vehicles Sold", value: "10,000+" },
  { label: "Customer Satisfaction", value: "98%" },
];

export function AboutUs() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Welcome to Auto Solution
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We have been working hard to bring San Antonio, TX one of the
              finest selections of pre-owned and certified used vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                We have been working hard to bring San Antonio, TX one of the
                finest selections of pre-owned and certified used vehicles. Stop
                by one of our convenient locations today to browse our inventory
                of quality cars, hard-working pickups, and family-friendly vans
                and SUVs.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                At Auto Solution we want to be your first stop for all your
                vehicle shopping needs. That's why we offer free vehicle history
                reports, competitive pricing and flexible, affordable financing
                options.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Our sales team will not be outdone. If you find a better deal on
                your next vehicle anywhere else, we will beat it.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Whether you're shopping for your daughter's first car, a
                luxurious touring SUV, or a tough, reliable work pickup, we
                always have something on the lot to match your budget and needs.
                Stop in today to meet with one of our sales team and put the
                power of Auto Solution to work for you.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                We want the opportunity to earn your business. It doesn't matter
                if this is your first time on the lot or the 12th time in a
                week, Auto Solution will work to find you the right vehicle, the
                right price, and the right financing for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-2 p-6 rounded-lg bg-card border border-border"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                        <value.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose Auto Solution?
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
                <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Best Price Guarantee
                  </h3>
                  <p className="text-muted-foreground">
                    Our sales team will not be outdone. If you find a better
                    deal on your next vehicle anywhere else, we will beat it.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Wide Selection of Quality Vehicles
                  </h3>
                  <p className="text-muted-foreground">
                    Browse our inventory of quality cars, hard-working pickups,
                    and family-friendly vans and SUVs. We always have something
                    on the lot to match your budget and needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Free Reports & Flexible Financing
                  </h3>
                  <p className="text-muted-foreground">
                    We offer free vehicle history reports, competitive pricing
                    and flexible, affordable financing options. We want the
                    opportunity to earn your business and will work to find you
                    the right vehicle, the right price, and the right financing.
                  </p>
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
              Ready to Find Your Perfect Vehicle?
            </h2>
            <p className="text-lg text-muted-foreground">
              Visit our showroom or browse our inventory online. We're here to
              help you find the perfect car that fits your needs and budget.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                
                <Link to="/">
                  <Search className="h-5 w-5" />
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
