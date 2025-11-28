import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useDeleteFavorites, useFavorites } from "../hooks/use-favorite";
import { ProductCard } from "../../products/components/product-card";

export function FavoritesPage() {
  const favoritesQuery = useFavorites();
  const removeFavorite = useDeleteFavorites();

  const isLoading = favoritesQuery.isLoading;
  const favorites = favoritesQuery.data;

  if (isLoading) {
    return <p>Carregando seus favoritos...</p>;
  }

  function handleRemove(favId: string) {
    removeFavorite.mutate(favId);
  }

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-primary text-white">
        <CardHeader>
          <CardTitle className="text-lg">MEUS FAVORITOS</CardTitle>
          <CardDescription className="text-white/70">
            Veja todos os produtos que você marcou como favoritos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {favorites?.length === 0 ? (
            <p className="text-white">Você ainda não favoritou nenhum produto.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {favorites!.map((fav) => (
                <ProductCard
                  key={fav.id}
                  product={fav.product}
                  isFavorite={true}
                  toggleFavorite={() => handleRemove(fav.id!)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
