import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo184512.png"
                alt="AutoSolutions Logo"
                className="h-7 w-30 object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Welcome to Auto Solution. We have been working hard to bring San
              Antonio, TX one of the finest selections of pre-owned and
              certified used vehicles.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/SAAutoSolution#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/AutoSolutionSA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/Auto.Solution/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/cars-for-sale"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cars for Sales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/finance"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Financing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about-us"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/staff"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Business Hours
            </h3>
            <div className="w-12 h-0.5 bg-primary mb-2"></div>
            <div className="space-y-0 text-sm">
              <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                <span className="text-muted-foreground">Mon-Fri</span>
                <span className="text-foreground">10:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                <span className="text-muted-foreground">Saturday</span>
                <span className="text-foreground">10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-foreground">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AutoSolutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
