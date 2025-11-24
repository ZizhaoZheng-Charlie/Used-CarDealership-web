import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";

export function ContactButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold"
        >
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">Contact Us</span>
            <span className="md:hidden">Contact</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white w-80 md:w-96">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              AUTO SOLUTION
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <a
                  href="https://www.google.com/maps/place/Auto+Solution/@29.481679,-98.6623269,859m/data=!3m1!1e3!4m15!1m8!3m7!1s0x865c5d3533f9073f:0xf74bac9dd32b99f7!2s8915+Grissom+Rd,+San+Antonio,+TX+78251!3b1!8m2!3d29.4815938!4d-98.6598007!16s%2Fg%2F11c2hvv3zn!3m5!1s0x865c5d352b0afa27:0x3479cf266dae3dbc!8m2!3d29.4814603!4d-98.6601056!16s%2Fg%2F1hc19w6n_?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 hover:text-primary transition-colors"
                >
                  8915 Grissom Road
                  <br />
                  San Antonio, TX 78251
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800 text-base">
                    Call Us
                  </p>
                  <a
                    href="tel:+12108645348"
                    className="text-base text-gray-600 hover:text-primary transition-colors"
                  >
                    (210) 864-5348
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <Link
                  to="/contact-us"
                  className="text-base text-gray-600 hover:text-primary transition-colors font-semibold"
                >
                  Email Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
