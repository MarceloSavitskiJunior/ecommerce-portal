import { api } from "@/lib/axios";
import type { CreateFavoritePayload, FavoritesDTO } from "../dtos/favorite.dto";

const BASE_URL = '/favorites'

export const FavoriteService = {
 
    async list(): Promise<FavoritesDTO[]> {
        const response = await api.get(BASE_URL)
        return response.data
    },

    async create(order: CreateFavoritePayload): Promise<FavoritesDTO> {
        const response = await api.post(BASE_URL, order)
        return response.data
    },

    async getById(id: string): Promise<FavoritesDTO> {
        const response = await api.get(`${BASE_URL}/${id}`)
        return response.data
    },

    async update(id: string, order: FavoritesDTO): Promise<FavoritesDTO> {
        const response = await api.put(`${BASE_URL}/${id}`, order)
        return response.data
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`)
    }
}