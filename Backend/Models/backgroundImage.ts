export interface BackgroundImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BackgroundImageCreateInput extends Omit<BackgroundImage, "id" | "createdAt" | "updatedAt"> {}

export interface BackgroundImageUpdateInput extends Partial<Omit<BackgroundImage, "id" | "createdAt" | "updatedAt">> {}

