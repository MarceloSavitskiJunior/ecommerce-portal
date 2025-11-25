import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../service/category.service";
import { toast } from "react-toastify";

export function useCategories() {
    return useQuery<CategoryDTO[]>({
       queryKey: ['categories'],
       queryFn: CategoryService.list
    });
}

export function useCategoryById(id: string) {
    return useQuery<CategoryDTO>({
        queryKey: ['category', id],
        queryFn: () => CategoryService.getById(id),
        enabled: !!id
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient()

    return useMutation<CategoryDTO, Error, Omit<CategoryDTO, 'id'>>({
        mutationFn: (category: Omit<CategoryDTO, 'id'>) => CategoryService.create(category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})
            toast.success('Registro adicionado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao adicionar categoria: ${error.message}`)
        }
    })
}

export function useUpdateCategory() {
    const queryClient = useQueryClient()

    return useMutation<CategoryDTO, Error, {id: string, category: CategoryDTO}>({
        mutationFn: ({id, category}) => CategoryService.update(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})
            toast.success('Registro alterado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao alterar categoria: ${error.message}`)
        }
    })
}

export function useDeleteCategory() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>({
        mutationFn: (id) => CategoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']})
            toast.success('Registro excluído com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao excluir categoria: ${error.message}`)
        }
    })
}