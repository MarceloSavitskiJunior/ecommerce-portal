import { Button } from "@/components/ui/button";
import { useCart } from "@/src/hooks/use-cart";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const { cart, total, removeItem, changeQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div className="p-10 text-center text-gray-500">
        Seu carrinho está vazio 🛒
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Seu Carrinho</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 bg-white rounded-xl border p-4 shadow-sm"
          >
            <img
              src={item.image ?? "/placeholder.jpg"}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">R$ {item.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    changeQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </Button>

                <span className="text-md">{item.quantity}</span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    changeQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl border shadow-sm">
        <p className="text-xl font-semibold">
          Total: <span className="text-primary">R$ {total.toFixed(2)}</span>
        </p>

        <Button className="w-full mt-4 text-lg py-6" onClick={() => navigate('/checkout')}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}
