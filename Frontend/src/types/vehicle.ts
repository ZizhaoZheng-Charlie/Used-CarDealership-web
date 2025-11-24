export interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  images?: string[];
  mileage: string;
  transmission: string;
  fuel: string;
  year: string;
  badge: string;
  condition: string;
  location?: string;
  store?: string;
}
