import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { Home } from "@/pages/Home";
import { AboutUs } from "@/pages/AboutUs";
import { Testimonials } from "@/pages/Testimonials";
import { Staff } from "@/pages/Staff";
import { ContactUs } from "@/pages/ContactUs";
import { Finance } from "@/pages/Finance";
import { CarsForSale } from "@/pages/CarsForSale";
import { CarDetail } from "@/pages/CarDetail";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars-for-sale" element={<CarsForSale />} />
            <Route path="/inventory/:id" element={<CarDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
