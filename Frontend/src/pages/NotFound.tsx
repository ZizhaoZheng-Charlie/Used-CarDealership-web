import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  return (
    <main className="flex-1">
      <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* 404 Number */}
            <div className="space-y-4">
              <h1 className="text-8xl md:text-9xl font-bold text-primary/20">
                404
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Page Not Found
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Oops! The page you're looking for doesn't exist. It might have
                been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/">
                  <Home className="h-5 w-5" />
                  Go to Homepage
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
