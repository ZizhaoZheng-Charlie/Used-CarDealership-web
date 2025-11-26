export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  vehicle?: string;
  date: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialCreateInput extends Omit<Testimonial, "id" | "createdAt" | "updatedAt"> {}

export interface TestimonialUpdateInput extends Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">> {}



