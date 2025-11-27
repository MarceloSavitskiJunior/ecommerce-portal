import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCart } from "@/src/hooks/use-cart";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartPage() {
  const { cart, total, removeItem, changeQuantity } = useCart();
  const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <Card className="max-w-md mx-auto p-8 mt-10 text-center">
        <CardContent className="text-gray-500 text-lg">
          Seu carrinho está vazio 🛒
        </CardContent>
      </Card>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Seu Carrinho</h1>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="shadow-sm">
            <CardContent className="flex gap-4 p-4">

              <div className="w-20 h-20 rounded-lg overflow-hidden border">
                <img
                  src={bucketBaseURL + item.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">R$ {item.price}</p>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => changeQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>

                  <span className="text-md">{item.quantity}</span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={22} />
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span className="text-primary">R$ {total.toFixed(2)}</span>
          </div>

          <Button
            className="w-full text-lg py-6"
            onClick={() => navigate("/checkout")}
          >
            Finalizar Compra
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
