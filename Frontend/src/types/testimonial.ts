export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  vehicle?: string;
  date: string;
  sortOrder: number; // Lower number = more recent
}
