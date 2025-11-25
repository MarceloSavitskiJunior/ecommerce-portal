import { Button } from "@/components/ui/button";
import { useCategories } from "../hooks/use-category";

interface CategoryFilterProps {
  categorySelected: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryFilter({
  categorySelected,
  onSelectCategory
}: CategoryFilterProps) {

  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <p>Carregando categorias...</p>;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">

      <Button
        variant={categorySelected === "" ? "default" : "outline"}
        onClick={() => onSelectCategory("")}
      >
        Todas
      </Button>

      {categories?.map(cat => (
        <Button
          className="
            px-4 py-2 rounded-full 
            border border-gray-300 
            text-gray-700 text-sm
            hover:bg-blue-50 hover:border-blue-300
            transition
          "
          key={cat.id ?? cat.name}
          variant={categorySelected === (cat.id ?? "") ? "default" : "outline"}
          onClick={() => onSelectCategory(cat.id ?? "")}
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
