export interface PopularItem {
  id?: number;
  name: string;
  count: number;
  category: PopularItemCategory;
  createdAt?: string;
  updatedAt?: string;
}

export type PopularItemCategory = "body_style" | "make" | "model";

export interface PopularItemCreateInput extends Omit<PopularItem, "id" | "createdAt" | "updatedAt"> {}

export interface PopularItemUpdateInput extends Partial<Omit<PopularItem, "id" | "createdAt" | "updatedAt">> {}



