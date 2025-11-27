import { OrderContent } from "../cases/orders/components/order-content";
import { useOrders } from "../cases/orders/hooks/use-order";

export function OrderPage() {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Pedidos</h1>

        <div className="py-8">
            {isLoading ? (
                <h1>Carregando...</h1>
            ) : (
                <OrderContent order={orders!} />
            )}
        </div>
    </div>
  );
}
