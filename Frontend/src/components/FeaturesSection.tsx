import { features } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Why Choose Auto Solution?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-6">
                  <Icon className="h-12 w-12" />
                </div>
                <h3 className="font-semibold text-lg md:text-2xl mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
