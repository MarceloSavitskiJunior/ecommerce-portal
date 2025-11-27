import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDTO } from "../dtos/product.dto";
import { toast } from "react-toastify";

export function ProductCard({ product }: { product: ProductDTO }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const isInCart = cart.some((item: any) => item.id === product.id);

  function addToCart() {
    if (isInCart) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    toast('Produto adicionado ao carrinho!');
  }

  return (
    <div
      className="
        relative border border-gray-200 rounded-xl p-3 
        shadow-sm hover:shadow-md transition-all duration-200
        bg-white cursor-pointer hover:-translate-y-1
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative">
        <img
          src={'/placeholder.jpg'}
          className="w-full h-40 object-cover rounded-lg"
        />

        {hovered && (
          <Button
            disabled={isInCart}
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="
              absolute top-2 right-2 
              bg-primary text-white text-sm 
              px-3 py-1 rounded-lg shadow-md 
              hover:bg-blend-overlay transition
            "
          >
            {isInCart ? "Adicionado" : "Adicionar"}
          </Button>
        )}
      </div>

      <div className="mt-3">
        <p className="font-semibold text-gray-900">{product.name}</p>
        <p className="text-sm text-gray-500">{product.category?.name}</p>

        <p className="font-bold mt-2 text-gray-900">
          R$ {product.price}
        </p>
      </div>
    </div>
  );
}
