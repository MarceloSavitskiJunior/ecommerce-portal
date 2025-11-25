import { api } from "@/lib/axios";
import type { BrandDTO } from "../dtos/brand.dto";

const BASE_URL = '/brands'

export const BrandService = {
 
    async list(): Promise<BrandDTO[]> {
        const response = await api.get(BASE_URL)
        return response.data
    },

    async create(brand: BrandDTO): Promise<BrandDTO> {
        const response = await api.post(BASE_URL, brand)
        return response.data
    },

    async getById(id: string): Promise<BrandDTO> {
        const response = await api.get(`${BASE_URL}/${id}`)
        return response.data
    },

    async update(id: string, brand: BrandDTO): Promise<BrandDTO> {
        const response = await api.put(`${BASE_URL}/${id}`, brand)
        return response.data
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`)
    }
}