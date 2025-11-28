import type { RatingDTO } from "../dto/rating.dto";
import type { CreateRatingPayload } from "../dto/create-rating.dto";
import { api } from "@/lib/axios";

export const RatingService = {
  async getUserPurchasedProducts(customerId: string): Promise<string[]> {
    const response = await api.get(`/ratings/purchased/${customerId}`);
    return response.data;
  },

  async getProductRatings(productId: string): Promise<RatingDTO[]> {
    const response = await api.get(`/ratings/product/${productId}`);
    return response.data;
  },

  async create(payload: CreateRatingPayload): Promise<RatingDTO> {
    const response = await api.post(`/ratings`, payload);
    return response.data;
  }
};
