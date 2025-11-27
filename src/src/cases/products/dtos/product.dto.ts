import type { BrandDTO } from "../../brands/dtos/brand.dto";
import type { CategoryDTO } from "../../categories/dtos/category.dto";

export interface ProductPhotoDTO {
  id?: string;
  path: string;
}

export interface ProductDTO {
  id?: string;
  name: string;
  description?: string;
  price: number;
  active: boolean;
  category: CategoryDTO;
  brand?: BrandDTO;
  photos?: ProductPhotoDTO[]
}