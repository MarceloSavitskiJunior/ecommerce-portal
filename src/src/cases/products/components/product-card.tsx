import { Button } from "@/components/ui/button";
import type { ProductDTO } from "../dtos/product.dto";
import { useState } from "react";

export function ProductCard({ product }: { product: ProductDTO }) {
  const [hovered, setHovered] = useState(false);

  // const rating = product.rating ?? 0;
  const rating = 0;
  // const reviewCount = product.reviewCount ?? 0;
  const reviewCount = 0;

  return (
    <div
      className="
        relative border border-gray-200 rounded-xl p-3 
        shadow-sm hover:shadow-md transition-all duration-200
        bg-white cursor-pointer
        hover:-translate-y-1
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <img
          src={'/placeholder.jpg'}
          className="w-full h-40 object-cover rounded-lg"
        />

        {!hovered && (
          <div className="
            absolute top-2 right-2 
            bg-white/80 backdrop-blur-sm 
            px-2 py-1 rounded-lg 
            flex items-center gap-1 shadow
          ">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
            <span className="text-xs text-gray-600">({reviewCount})</span>
          </div>
        )}

        {hovered && (
          <Button
            className="
              absolute top-2 right-2 
              bg-primary text-white text-sm 
              px-3 py-1 rounded-lg shadow-md 
              hover:bg-blend-overlay transition
            "
          >
            Adicionar
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
