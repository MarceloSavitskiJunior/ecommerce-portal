import { useNavigate } from "react-router-dom";
import { HeaderIcons } from "./header-icons";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4">
      <h1 onClick={() => navigate('/')} className="text-xl font-bold">E-commerce</h1>
      <HeaderIcons />
    </header>
  );
}
