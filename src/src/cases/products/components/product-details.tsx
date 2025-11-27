import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useProductById } from "../hooks/use-product";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProductById(id!);

  const [added, setAdded] = useState(false);

  if (isLoading) return <p className="p-4">Carregando produto...</p>;
  if (!product) return <p className="p-4">Produto não encontrado.</p>;

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: product!!.id,
      name: product!!.name,
      price: product!!.price,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="w-full">
          <img
            src={"/placeholder.jpg"}
            className="w-full h-80 object-cover rounded-xl shadow"
          />
        </div>

        {/* DETALHES */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-lg text-gray-600">
            Categoria: <span className="font-semibold">{product.category?.name}</span>
          </p>

          <p className="text-2xl font-bold text-primary">
            R$ {product.price}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {product.description ?? "Este produto ainda não possui descrição."}
          </p>

          <Button onClick={addToCart} className="w-full md:w-1/2 mt-4">
            {added ? "Adicionado!" : "Adicionar ao carrinho"}
          </Button>
        </div>
      </div>
    </div>
  );
}
