import { api } from "@/lib/axios";
import type { OrderDTO } from "../dto/order.dto";

const BASE_URL = '/orders'

export const OrderService = {
 
    async list(): Promise<OrderDTO[]> {
        const response = await api.get(BASE_URL)
        return response.data
    },

    async create(order: OrderDTO): Promise<OrderDTO> {
        const response = await api.post(BASE_URL, order)
        return response.data
    },

    async getById(id: string): Promise<OrderDTO> {
        const response = await api.get(`${BASE_URL}/${id}`)
        return response.data
    },

    async update(id: string, order: OrderDTO): Promise<OrderDTO> {
        const response = await api.put(`${BASE_URL}/${id}`, order)
        return response.data
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`)
    }
}