import type { CustomerDTO } from "../../customer/dto/customer.dto";
import type { ProductDTO } from "../../products/dtos/product.dto";

export interface FavoritesDTO {
    id?: string;
    customer?: CustomerDTO;
    product: ProductDTO;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateFavoritePayload {
  productId: string;
  customerId: string;
}