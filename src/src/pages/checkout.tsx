import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useAuth } from "../cases/auth/hooks/use-auth";

export function CheckoutPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  async function finalizeOrder() {
    const payload = {
      supabaseUserId: user!!.id,
      items: cart.map((c) => ({
        productId: c.id,
        quantity: c.quantity,
      })),
    };

    await api.post("/orders", payload);

    localStorage.removeItem("cart");
    alert("Pedido finalizado com sucesso!");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold">Resumo do Pedido</h1>

      {cart.map((item) => (
        <div key={item.id} className="border p-2 my-2">
          {item.name} — {item.quantity}x
        </div>
      ))}

      <button
        onClick={finalizeOrder}
        className="bg-primary text-white py-3 w-full mt-4 rounded"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
