import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDTO } from "../dtos/product.dto";
import { toast } from "react-toastify";

export function ProductCard({ product }: { product: ProductDTO }) {
  const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
  const [imagePath, setImagePath] = useState("");
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const isInCart = cart.some((item: any) => item.id === product.id);

  useEffect(() => {
    if (product.photos && product.photos.length > 0) {
      const fullURL = bucketBaseURL + product.photos[0].path;
      setImagePath(fullURL);
    }
  }, [product]);

  function addToCart() {
    if (isInCart) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product!!.photos!![0].path
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    toast("Produto adicionado ao carrinho!");
  }

  const price = Number(product.price);
  const fakePrice = (price * 1.30).toFixed(2);
  const installments = 12;
  const installmentValue = (price / installments).toFixed(2);

  return (
    <Card
      className="
        relative overflow-hidden rounded-xl shadow-sm 
        transition-all duration-200 hover:shadow-md hover:-translate-y-1 
        cursor-pointer
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardHeader className="p-0 relative bg-white flex items-center justify-center h-48">
        <img
          src={imagePath || "/placeholder.jpg"}
          className="w-full h-full object-contain p-2"
          alt={product.name}
        />

        {hovered && (
          <Button
            disabled={isInCart}
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="absolute top-3 right-3"
            size="sm"
          >
            {isInCart ? "Adicionado" : "Adicionar"}
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <p className="font-semibold text-gray-900 text-lg leading-tight">
          {product.name}
        </p>

        <p className="text-sm text-gray-500">{product.category?.name}</p>

        <div className="mt-3">
          <p className="text-gray-400 text-sm line-through">
            R$ {fakePrice}
          </p>

          <p className="text-xl font-bold text-green-600">
            R$ {price.toFixed(2)}
          </p>

          <p className="text-sm text-gray-600">
            {installments}x de R$ {installmentValue}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
