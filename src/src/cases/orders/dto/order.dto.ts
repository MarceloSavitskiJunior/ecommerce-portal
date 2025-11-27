import type { CustomerDTO } from "../../customer/dto/customer.dto";
import type { ProductDTO } from "../../products/dtos/product.dto";

export class OrderItemDTO {
    id?: string;
    order?: OrderDTO;
    product?: ProductDTO;
    quantity?: number
    total?: number
    createdAt?: Date
    updatedAt?: Date
}

export interface OrderDTO {
    id?: string;
    shipping?: number;
    customer?: CustomerDTO;
    status?: string;
    total?: number;
    itens: OrderItemDTO[];
    createdAt?: Date;
    updatedAt?: Date;
}