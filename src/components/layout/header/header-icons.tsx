import { Heart, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeaderIcons() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 items-center text-gray-700 cursor-pointer">
      <User onClick={() => navigate("/login")} />

      <Heart
        className="cursor-pointer"
        onClick={() => navigate("/favorites")}
      />

      <ShoppingCart
        className="cursor-pointer"
        onClick={() => navigate("/cart")}
      />

      <ShoppingBag 
        className="cursor-pointer"
        onClick={() => navigate("/orders")}
      />
    </div>
  );
}
