import { useCategories } from "../hooks/use-category";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function CategoryCardList() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <p>Carregando categorias...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories?.map((cat) => (
        <Card
          key={cat.id}
          className="overflow-hidden shadow hover:shadow-lg transition cursor-pointer group"
        >
          <div className="h-28 w-full overflow-hidden">
            <img
              src={"/category-placeholder.jpg"}
              alt={cat.name}
              className="h-full w-full object-cover group-hover:scale-105 transition"
            />
          </div>

          <CardContent className="p-3">
            <CardTitle className="text-center text-sm font-medium">
              {cat.name}
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
