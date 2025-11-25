import { HeaderIcons } from "./header-icons";

export function Header() {
  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">E-commerce</h1>
      <HeaderIcons />
    </header>
  );
}
