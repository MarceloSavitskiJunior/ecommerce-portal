import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDTO } from "../dtos/product.dto";
import { toast } from "react-toastify";
import { usePurchasedProducts } from "../../rating/hooks/use-rating";
import { useAuth } from "../../auth/hooks/use-auth";

type Props = {
  product: ProductDTO;
  isFavorite?: boolean;
  toggleFavorite?: () => void;
};

export function ProductCard({ product, isFavorite, toggleFavorite }: Props) {
  const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
  const { user } = useAuth();

  const [imagePath, setImagePath] = useState("");
  const [hovered, setHovered] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const navigate = useNavigate();

  const purchasedProducts = usePurchasedProducts(user?.id ?? "");
  const hasPurchased = purchasedProducts.data?.includes(product.id!) ?? false;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const isInCart = cart.some((item: any) => item.id === product.id);

  useEffect(() => {
    if (product.photos && product.photos.length > 0) {
      setImagePath(bucketBaseURL + product.photos[0].path);
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
      image: bucketBaseURL + product.photos![0].path,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Produto adicionado ao carrinho!");
  }

  const price = Number(product.price);
  const fakePrice = (price * 1.3).toFixed(2);
  const installments = 12;
  const installmentValue = (price / installments).toFixed(2);

  return (
    <>
      <Card
        className="
          relative overflow-hidden rounded-xl shadow-sm 
          transition-all duration-200 hover:shadow-md hover:-translate-y-1 
          cursor-pointer bg-white
        "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {toggleFavorite && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="absolute top-3 left-3 z-20 p-1 rounded-full bg-white shadow"
          >
            <Heart
              size={22}
              className={
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }
            />
          </Button>
        )}

        {hasPurchased && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setShowRatingModal(true);
            }}
            className="absolute bottom-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-lg flex items-center gap-1"
          >
            <Star size={14} /> Avaliar
          </Button>
        )}

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
          <p className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
            {product.name}
          </p>

          <p className="text-sm text-gray-500">{product.category?.name}</p>

          <div className="mt-3">
            <p className="text-gray-400 text-sm line-through">R$ {fakePrice}</p>

            <p className="text-xl font-bold text-green-600">
              R$ {price.toFixed(2)}
            </p>

            <p className="text-sm text-gray-600">
              {installments}x de R$ {installmentValue}
            </p>
          </div>
        </CardContent>
      </Card>

      {showRatingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Avaliar Produto</h2>

            <p>Modal placeholder — posso criar o modal completo se quiser.</p>

            <Button
              className="mt-4 w-full"
              onClick={() => setShowRatingModal(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
