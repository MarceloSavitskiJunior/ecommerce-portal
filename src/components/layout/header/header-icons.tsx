import { ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeaderIcons() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 items-center text-gray-700">
      <User onClick={() => navigate("/login")} />

      <ShoppingCart
        className="cursor-pointer"
        onClick={() => navigate("/cart")}
      />
    </div>
  );
}
