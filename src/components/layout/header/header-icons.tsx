import { ShoppingCart, User } from "lucide-react";

export function HeaderIcons() {
  return (
    <div className="flex gap-4 items-center text-gray-700">
      <User className="cursor-pointer" />
      <ShoppingCart className="cursor-pointer" />
    </div>
  );
}
