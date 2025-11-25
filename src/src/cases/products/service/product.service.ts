import { api } from "@/lib/axios";
import type { ProductDTO } from "../dtos/product.dto";

const BASE_URL = '/products'

export const ProductService = {
 
    async list(): Promise<ProductDTO[]> {
        const response = await api.get(BASE_URL)
        return response.data
    },

    async create(product: ProductDTO): Promise<ProductDTO> {
        const response = await api.post(BASE_URL, product)
        return response.data
    },

    async getById(id: string): Promise<ProductDTO> {
        const response = await api.get(`${BASE_URL}/${id}`)
        return response.data
    },

    async getByCategoryId(categoryId: string): Promise<ProductDTO[]> {
        const response = await api.get(`${BASE_URL}?categoryId=${categoryId}`)
        return response.data
    },

    async update(id: string, product: ProductDTO): Promise<ProductDTO> {
        const response = await api.put(`${BASE_URL}/${id}`, product)
        return response.data
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`)
    }
}