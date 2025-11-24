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
  createdAt?: string;
  updatedAt?: string;
}

export interface VehicleImage {
  id: number;
  vehicleId: number;
  imageUrl: string;
  sortOrder: number;
}

export interface VehicleCreateInput
  extends Omit<Vehicle, "id" | "createdAt" | "updatedAt"> {}

export interface VehicleUpdateInput
  extends Partial<Omit<Vehicle, "id" | "createdAt" | "updatedAt">> {}
