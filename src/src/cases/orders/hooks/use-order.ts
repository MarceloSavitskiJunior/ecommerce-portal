import { useMutation, useQuery } from "@tanstack/react-query";
import type { OrderDTO } from "../dto/order.dto";
import { OrderService } from "../service/order.service";

export function useOrders() {
    return useQuery<OrderDTO[]>({
       queryKey: ['Orders'],
       queryFn: OrderService.list
    });
}

export function useOrderById(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['Order', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id
    });
}

export function useCreateOrder() {
    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (Order: Omit<OrderDTO, 'id'>) => OrderService.create(Order)
    })
}

export function useUpdateOrder() {
    return useMutation<OrderDTO, Error, {id: string, Order: OrderDTO}>({
        mutationFn: ({id, Order}) => OrderService.update(id, Order)
    })
}

export function useDeleteOrder() {
    return useMutation<void, Error, string>({
        mutationFn: (id) => OrderService.delete(id)
    })
}