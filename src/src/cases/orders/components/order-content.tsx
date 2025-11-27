import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { OrderDTO } from "../dto/order.dto";

type OrderContentProps = {
  order: OrderDTO[];
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  ['NEW']: "Novo pedido",
  ['SEPARATION']: "Em separação",
  ['INVOICED']: "Faturado",
  ['SHIPPED']: "Enviado",
  ['DELIVERED']: "Entregue",
  ['CANCELED']: "Cancelado",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  ['NEW']: "bg-blue-500 text-white",
  ['SEPARATION']: "bg-yellow-500 text-black",
  ['INVOICED']: "bg-purple-500 text-white",
  ['SHIPPED']: "bg-indigo-500 text-white",
  ['DELIVERED']: "bg-green-600 text-white",
  ['CANCELED']: "bg-red-600 text-white",
};

export function OrderContent({ order }: OrderContentProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Meus Pedidos</h1>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {order.map((item) => (
          <Card key={item.id} className="shadow-md hover:shadow-lg transition">
            <CardContent className="p-6 space-y-4">

              {/* Cabeçalho | Data + Status */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Pedido realizado em{" "}
                  <strong>
                    {item.createdAt &&
                      new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </strong>
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${ORDER_STATUS_COLORS[item.status!]}`}
                >
                  {ORDER_STATUS_LABELS[item.status!]}
                </span>
              </div>

              {/* Customer */}
              {item.customer && (
                <div className="text-sm">
                  <p className="text-muted-foreground">Cliente</p>
                  <p className="font-semibold">{item.customer.name}</p>
                </div>
              )}

              <div className="border-t pt-3">
                <p className="text-sm text-muted-foreground">
                  ID do pedido:
                </p>
                <p className="font-mono text-sm">{item.id}</p>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
