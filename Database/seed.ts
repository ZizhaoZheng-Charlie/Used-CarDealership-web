import db from "./database.js";
import { initializeDatabase } from "./database.js";

// Import data from constants (we'll need to convert this)
const vehiclesData = [
  {
    name: "2012 Nissan Frontier",
    price: "$18,500",
    image:
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a.jpg",
    images: [
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a.jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (1).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (2).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (3).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (4).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (5).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (6).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (7).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (8).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (9).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (10).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (11).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (12).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (13).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (14).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (15).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (16).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (17).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (18).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (19).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (20).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (21).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (22).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (23).jpg",
      "/2012 nissan frontier/2012-nissan-frontier-s-4x2-4dr-crew-cab-swb-pickup-5a (24).jpg",
    ],
    mileage: "85,500",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2012",
    badge: "Certified",
    condition: "Repairable",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2022 Honda CR-V",
    price: "$32,900",
    image: "/2022-honda-crv-blue.jpg",
    mileage: "18,200",
    transmission: "Automatic",
    fuel: "Hybrid",
    year: "2022",
    badge: "Popular",
    condition: "Used",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2024 Ford F-150",
    price: "$45,200",
    image: "/2024-ford-f150-truck.jpg",
    mileage: "5,800",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2024",
    badge: "New Arrival",
    condition: "New",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2023 BMW 3 Series",
    price: "$42,800",
    image: "/2023-bmw-3-series-black.jpg",
    mileage: "8,900",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2023",
    badge: "Luxury",
    condition: "Manufacturer Certified",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2022 Tesla Model 3",
    price: "$38,900",
    image: "/2022-tesla-model-3-red.jpg",
    mileage: "15,400",
    transmission: "Automatic",
    fuel: "Electric",
    year: "2022",
    badge: "Electric",
    condition: "Manufacturer Certified",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2023 Mazda CX-5",
    price: "$29,700",
    image: "/2023-mazda-cx5-gray.jpg",
    mileage: "11,200",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2023",
    badge: "Top Rated",
    condition: "Manufacturer Certified",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2023 Honda Accord",
    price: "$27,800",
    image: "/nophoto.png",
    mileage: "14,300",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2023",
    badge: "Popular",
    condition: "Manufacturer Certified",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2022 Ford Mustang",
    price: "$35,400",
    image: "/nophoto.png",
    mileage: "16,800",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2022",
    badge: "Sport",
    condition: "Used",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2023 Audi A4",
    price: "$39,200",
    image: "/nophoto.png",
    mileage: "9,500",
    transmission: "Automatic",
    fuel: "Gasoline",
    year: "2023",
    badge: "Luxury",
    condition: "Manufacturer Certified",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
  {
    name: "2024 Toyota RAV4",
    price: "$31,900",
    image: "/nophoto.png",
    mileage: "6,200",
    transmission: "Automatic",
    fuel: "Hybrid",
    year: "2024",
    badge: "New Arrival",
    condition: "New",
    location: "San Antonio, TX",
    store: "CarMax San Antonio, TX",
  },
];

const testimonialsData = [
  {
    name: "Emily Rodriguez",
    location: "San Antonio, TX",
    rating: 5,
    text: "I was nervous about buying a used car, but Auto Solution put all my worries to rest. They were honest, professional, and truly cared about finding me the right vehicle. The inspection process was thorough, and I felt confident in my purchase.",
    vehicle: "2023 Mazda CX-5",
    date: "1 week ago",
    sortOrder: 1,
  },
  {
    name: "Sarah Johnson",
    location: "San Antonio, TX",
    rating: 5,
    text: "I had an amazing experience at Auto Solution! The staff was incredibly helpful and patient throughout the entire process. They helped me find the perfect SUV for my family, and the financing options were exactly what I needed. Highly recommend!",
    vehicle: "2023 Toyota RAV4",
    date: "2 weeks ago",
    sortOrder: 2,
  },
  {
    name: "Lisa Anderson",
    location: "San Antonio, TX",
    rating: 5,
    text: "As a first-time car buyer, I was overwhelmed, but the team at Auto Solution guided me through every step. They explained everything clearly, helped me understand financing, and made sure I was comfortable with my decision. I couldn't be happier!",
    vehicle: "2023 Toyota Camry",
    date: "3 weeks ago",
    sortOrder: 3,
  },
  {
    name: "James Wilson",
    location: "San Antonio, TX",
    rating: 5,
    text: "Outstanding customer service from start to finish. The free vehicle history report gave me peace of mind, and the competitive pricing was exactly what I was looking for. The entire process was streamlined and stress-free. Highly recommend Auto Solution!",
    vehicle: "2023 Mercedes C-Class",
    date: "1 month ago",
    sortOrder: 4,
  },
  {
    name: "Michael Chen",
    location: "San Antonio, TX",
    rating: 5,
    text: "Best car buying experience I've ever had. The team was transparent about pricing, provided a free vehicle history report, and made sure I got a great deal. The car I purchased has been running perfectly. Thank you Auto Solution!",
    vehicle: "2022 Honda CR-V",
    date: "2 months ago",
    sortOrder: 5,
  },
  {
    name: "David Martinez",
    location: "San Antonio, TX",
    rating: 5,
    text: "Fast, efficient, and fair pricing. The sales team didn't pressure me at all and gave me time to make the right decision. The financing process was smooth, and I drove away with my dream truck the same day. Excellent service!",
    vehicle: "2024 Ford F-150",
    date: "3 months ago",
    sortOrder: 6,
  },
  {
    name: "Jennifer Williams",
    location: "San Antonio, TX",
    rating: 5,
    text: "Auto Solution exceeded my expectations in every way. They beat a competitor's price and provided better financing terms. The vehicle has been reliable, and I appreciate the ongoing support. This is how car buying should be!",
    vehicle: "2023 BMW 3 Series",
    date: "4 months ago",
    sortOrder: 7,
  },
  {
    name: "Robert Taylor",
    location: "San Antonio, TX",
    rating: 5,
    text: "I've purchased two vehicles from Auto Solution now, and both experiences were outstanding. Their best price guarantee is real - they matched and beat another dealer's offer. The quality of their inventory is top-notch, and the staff is knowledgeable and friendly.",
    vehicle: "2022 Tesla Model 3",
    date: "5 months ago",
    sortOrder: 8,
  },
];

const staffData = [
  {
    name: "Kara Hernandez",
    position: "F&I Manager",
    department: "Finance",
    email: "khernandez@autosolutionsa.com",
    phone: "(210) 446-4944",
    cellPhone: "(210) 364-6258",
  },
  {
    name: "Robert Hernandez",
    position: "Sales Manager",
    department: "Sales",
    email: "rhernandez@autosolutionsa.com",
    phone: "(210) 446-4944",
    cellPhone: "(210) 606-7866",
  },
];

const popularItemsData = {
  bodyStyles: [
    { name: "SUV", count: 245 },
    { name: "Sedan", count: 189 },
    { name: "Truck", count: 156 },
    { name: "Coupe", count: 98 },
    { name: "Hatchback", count: 87 },
    { name: "Convertible", count: 45 },
    { name: "Wagon", count: 32 },
    { name: "Van", count: 28 },
  ],
  makes: [
    { name: "Toyota", count: 342 },
    { name: "Honda", count: 298 },
    { name: "Ford", count: 267 },
    { name: "BMW", count: 189 },
    { name: "Mercedes-Benz", count: 176 },
    { name: "Tesla", count: 145 },
    { name: "Audi", count: 134 },
    { name: "Mazda", count: 112 },
    { name: "Nissan", count: 98 },
    { name: "Chevrolet", count: 87 },
    { name: "Lexus", count: 76 },
    { name: "Hyundai", count: 65 },
  ],
  models: [
    { name: "Camry", count: 89 },
    { name: "CR-V", count: 76 },
    { name: "F-150", count: 65 },
    { name: "Model 3", count: 54 },
    { name: "3 Series", count: 48 },
    { name: "CX-5", count: 43 },
    { name: "C-Class", count: 39 },
    { name: "RAV4", count: 37 },
    { name: "Accord", count: 34 },
    { name: "A4", count: 32 },
    { name: "RX", count: 28 },
    { name: "Tucson", count: 25 },
  ],
};

const backgroundImagesData = ["/ss1.jpg", "/ss2.jpg", "/ss3.jpg", "/ss4.jpg"];

export function seedDatabase() {
  initializeDatabase();

  // Clear existing data
  db.exec("DELETE FROM vehicle_images");
  db.exec("DELETE FROM vehicles");
  db.exec("DELETE FROM testimonials");
  db.exec("DELETE FROM staff_members");
  db.exec("DELETE FROM popular_items");
  db.exec("DELETE FROM background_images");

  // Insert vehicles
  const insertVehicle = db.prepare(`
    INSERT INTO vehicles (name, price, image, mileage, transmission, fuel, year, badge, condition, location, store)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertVehicleImage = db.prepare(`
    INSERT INTO vehicle_images (vehicle_id, image_url, sort_order)
    VALUES (?, ?, ?)
  `);

  const insertVehicleTransaction = db.transaction((vehicles) => {
    for (const vehicle of vehicles) {
      const result = insertVehicle.run(
        vehicle.name,
        vehicle.price,
        vehicle.image,
        vehicle.mileage,
        vehicle.transmission,
        vehicle.fuel,
        vehicle.year,
        vehicle.badge,
        vehicle.condition,
        vehicle.location,
        vehicle.store
      );
      const vehicleId = result.lastInsertRowid as number;

      if (vehicle.images) {
        vehicle.images.forEach((img, index) => {
          insertVehicleImage.run(vehicleId, img, index);
        });
      }
    }
  });

  insertVehicleTransaction(vehiclesData);

  // Insert testimonials
  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (name, location, rating, text, vehicle, date, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTestimonialTransaction = db.transaction((testimonials) => {
    for (const testimonial of testimonials) {
      insertTestimonial.run(
        testimonial.name,
        testimonial.location,
        testimonial.rating,
        testimonial.text,
        testimonial.vehicle,
        testimonial.date,
        testimonial.sortOrder
      );
    }
  });

  insertTestimonialTransaction(testimonialsData);

  // Insert staff
  const insertStaff = db.prepare(`
    INSERT INTO staff_members (name, position, department, email, phone, cell_phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertStaffTransaction = db.transaction((staff) => {
    for (const member of staff) {
      insertStaff.run(
        member.name,
        member.position,
        member.department,
        member.email,
        member.phone,
        member.cellPhone
      );
    }
  });

  insertStaffTransaction(staffData);

  // Insert popular items
  const insertPopularItem = db.prepare(`
    INSERT INTO popular_items (category, name, count)
    VALUES (?, ?, ?)
  `);

  const insertPopularItemTransaction = db.transaction((items, category) => {
    for (const item of items) {
      insertPopularItem.run(category, item.name, item.count);
    }
  });

  insertPopularItemTransaction(popularItemsData.bodyStyles, "body_style");
  insertPopularItemTransaction(popularItemsData.makes, "make");
  insertPopularItemTransaction(popularItemsData.models, "model");

  // Insert background images
  const insertBackgroundImage = db.prepare(`
    INSERT INTO background_images (image_url, sort_order)
    VALUES (?, ?)
  `);

  const insertBackgroundImageTransaction = db.transaction((images) => {
    images.forEach((img, index) => {
      insertBackgroundImage.run(img, index);
    });
  });

  insertBackgroundImageTransaction(backgroundImagesData);

  console.log("Database seeded successfully");
}

// Run seed if this file is executed directly
seedDatabase();
