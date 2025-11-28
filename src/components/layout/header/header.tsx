import { useNavigate } from "react-router-dom";
import { HeaderIcons } from "./header-icons";
import { ShoppingCartIcon } from "lucide-react";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4">
      <div
        onClick={() => navigate('/')}
        className="flex items-center cursor-pointer space-x-2"
      >
        <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
        <h1 className="text-xl font-bold">MJ Shop</h1>
      </div>
      <HeaderIcons />
    </header>
  );
}
