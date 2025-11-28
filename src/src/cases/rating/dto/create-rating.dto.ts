export interface CreateRatingPayload {
  productId: string;
  customerId: string;
  rating: number;
  comment?: string;
}