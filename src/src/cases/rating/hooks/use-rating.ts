import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { RatingDTO } from "../dto/rating.dto";
import type { CreateRatingPayload } from "../dto/create-rating.dto";
import { RatingService } from "../service/rating.service";

export function usePurchasedProducts(customerId: string) {
  return useQuery({
    queryKey: ["PurchasedProducts", customerId],
    queryFn: () => RatingService.getUserPurchasedProducts(customerId),
    enabled: !!customerId
  });
}

export function useProductRatings(productId: string) {
  return useQuery<RatingDTO[]>({
    queryKey: ["Ratings", productId],
    queryFn: () => RatingService.getProductRatings(productId),
    enabled: !!productId
  });
}

export function useCreateRating() {
  const queryClient = useQueryClient();

  return useMutation<RatingDTO, Error, CreateRatingPayload>({
    mutationFn: RatingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Ratings"] });
      toast.success("Avaliação enviada com sucesso!");
    },
    onError: (err) => {
      toast.error("Erro ao enviar avaliação");
    }
  });
}
