import { useMutation, useQuery } from "@tanstack/react-query";
import type { BrandDTO } from "../dtos/brand.dto";
import { BrandService } from "../service/brand.service";

export function useBrands() {
    return useQuery<BrandDTO[]>({
       queryKey: ['brands'],
       queryFn: BrandService.list
    });
}

export function useBrandById(id: string) {
    return useQuery<BrandDTO>({
        queryKey: ['brand', id],
        queryFn: () => BrandService.getById(id),
        enabled: !!id
    });
}

export function useCreateBrand() {
    return useMutation<BrandDTO, Error, Omit<BrandDTO, 'id'>>({
        mutationFn: (brand: Omit<BrandDTO, 'id'>) => BrandService.create(brand)
    })
}

export function useUpdateBrand() {
    return useMutation<BrandDTO, Error, {id: string, brand: BrandDTO}>({
        mutationFn: ({id, brand}) => BrandService.update(id, brand)
    })
}

export function useDeleteBrand() {
    return useMutation<void, Error, string>({
        mutationFn: (id) => BrandService.delete(id)
    })
}