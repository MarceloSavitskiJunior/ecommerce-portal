import { useEffect, useState } from "react";
import { useAuth } from "../cases/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useCreateOrder } from "../cases/orders/hooks/use-order";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function CheckoutPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  function updateQuantity(id: string, quantity: number) {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function removeItem(id: string) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  async function finalizeOrder() {
    if (!user) {
      toast.error("Você precisa estar logado!");
      return;
    }

    const payload = {
      supabaseId: user.id,
      itens: cart.map((c) => ({
        productId: c.id,
        quantity: c.quantity,
      })),
    };

    createOrder.mutate(payload, {
      onSuccess: () => {
        localStorage.removeItem("cart");
        toast.success("Pedido finalizado com sucesso!");
        navigate('/')
      },
      onError: () => {
        toast.error("Erro ao finalizar pedido.");
      },
    });
  }

  const totalProdutos = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-4xl p-6 shadow-lg">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-sm rounded-xl p-5 flex items-center gap-4 border"
              >
                <img
                  src={bucketBaseURL + item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain bg-gray-50 rounded"
                />

                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.brand}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="text-xl"
                      >
                        −
                      </Button>

                      <span className="text-lg">{item.quantity}</span>

                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-xl"
                      >
                        +
                      </Button>
                    </div>

                    <div className="font-semibold text-right text-lg">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </div>

                    <Button onClick={() => removeItem(item.id)}>
                      <Trash2 className="text-red-500 hover:text-red-700" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                Seu carrinho está vazio.
              </p>
            )}
          </div>

          <div className="bg-white shadow p-6 rounded-xl border h-fit">
            <h2 className="text-xl font-bold mb-4">Total do Pedido:</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Frete:</span>
                <span>R$ 0,00</span>
              </div>

              <div className="flex justify-between">
                <span>Produtos:</span>
                <span>R$ {totalProdutos.toFixed(2)}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>R$ {totalProdutos.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={finalizeOrder}
              className="bg-green-600 hover:bg-green-700 w-full mt-6 py-3 text-white rounded-lg"
              disabled={createOrder.isPending}
            >
              {createOrder.isPending ? "Enviando..." : "Finalizar o Pedido"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
