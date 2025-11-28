import type { CustomerDTO } from "../../customer/dto/customer.dto";
import type { ProductDTO } from "../../products/dtos/product.dto";

export interface RatingDTO {
  id: string;
  rating: number;
  comment?: string;
  product: ProductDTO;
  customer: CustomerDTO;
}
