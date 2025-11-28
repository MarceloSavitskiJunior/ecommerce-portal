import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { FavoritesDTO } from "../dtos/favorite.dto";
import { FavoriteService } from "../service/favorite.service";

export function useFavorites() {
    return useQuery<FavoritesDTO[]>({
       queryKey: ['Favorites'],
       queryFn: FavoriteService.list
    });
}

export function useFavoritesById(id: string) {
    return useQuery<FavoritesDTO>({
        queryKey: ['Favorites', id],
        queryFn: () => FavoriteService.getById(id),
        enabled: !!id
    });
}

export function useCreateFavorites() {
  const queryClient = useQueryClient()

  return useMutation<FavoritesDTO, Error, { productId: string; customerId: string }>({
    mutationFn: (data) => FavoriteService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Favorites'] })
      toast.success('Produto favoritado com sucesso!')
    },
    onError: (error) => {
      toast.error(`Erro ao adicionar produto: ${error.message}`)
    }
  })
}

export function useDeleteFavorites() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => FavoriteService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['Favorites']})
            toast.success('Produto deixou de ser favoritado!')
        },
        onError: (error) => {
            toast.error(`Erro ao excluir produto: ${error.message}`)
        }
    })
}