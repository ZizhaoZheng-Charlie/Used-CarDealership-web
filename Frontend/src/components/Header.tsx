import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/NavigationMenu";
import { ContactButton } from "@/components/ContactBanner";

export function Header() {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo184512.png"
              alt="AutoSolutions Logo"
              className="h-14 w-100% object-contain"
            />
          </Link>
          <NavigationMenu
            viewport={false}
            className="flex-1 flex justify-center"
          >
            <NavigationMenuList className="hidden md:flex items-center gap-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-base font-semibold text-foreground hover:text-primary transition-all duration-200 px-6 py-3 rounded-lg hover:bg-accent"
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-semibold text-muted-foreground hover:text-foreground data-[state=open]:text-foreground">
                  Cars For Sale
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[240px] p-1.5 bg-white space-y-0.5">
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link to="/cars-for-sale">ALL CARS FOR SALE</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link to="/cars-for-sale?bodyStyle=suv">
                        SUVS FOR SALE
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link to="/cars-for-sale?bodyStyle=sedan">
                        SEDAN FOR SALE
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link to="/cars-for-sale?bodyStyle=truck">
                        PICKUP TRUCKS FOR SALE
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link to="/cars-for-sale?bodyStyle=wagon">
                        WAGON FOR SALE
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      asChild
                      className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link to="/cars-for-sale?bodyStyle=hatchback">
                        HATCHBACKS FOR SALE
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 px-6 py-3 rounded-lg hover:bg-accent"
                >
                  <Link to="/about-us">About us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 px-6 py-3 rounded-lg hover:bg-accent"
                >
                  <Link to="/staff">Staff</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 px-6 py-3 rounded-lg hover:bg-accent"
                >
                  <Link to="/testimonials">Testimonial</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 px-6 py-3 rounded-lg hover:bg-accent"
                >
                  <Link to="/contact-us">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-base font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 px-6 py-3 rounded-lg hover:bg-accent"
                >
                  <Link to="/finance">Finance</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-3">
          <ContactButton />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
