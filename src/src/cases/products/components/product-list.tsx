import { useAuth } from "../../auth/hooks/use-auth";
import { useCreateFavorites, useDeleteFavorites, useFavorites } from "../../favorites/hooks/use-favorite";
import { useProducts } from "../hooks/use-product";
import { ProductCard } from "./product-card";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

import { useState } from "react";
import { useCategories } from "../../categories/hooks/use-category";
import { Button } from "@/components/ui/button";

export function ProductList() {
  const { user } = useAuth();

  const allProductsQuery = useProducts();
  const favoritesQuery = useFavorites();
  const categoriesQuery = useCategories();

  const addFavorite = useCreateFavorites();
  const removeFavorite = useDeleteFavorites();

  const products = allProductsQuery.data;
  const categories = categoriesQuery.data;

  const isLoading =
    allProductsQuery.isLoading ||
    favoritesQuery.isLoading ||
    categoriesQuery.isLoading;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return <p>Carregando produtos...</p>;
  }

  function isFavorite(productId: string) {
    return favoritesQuery.data?.some((fav) => fav.product.id === productId);
  }

  function toggleFavorite(productId: string) {
    if (!user) return alert("Você precisa estar logado para favoritar.");

    const fav = favoritesQuery.data?.find((f) => f.product.id === productId);

    if (fav) {
      removeFavorite.mutate(fav.id!!);
    } else {
      addFavorite.mutate({
        productId: productId,
        customerId: user.id
      });
    }
  }

  const filteredProducts =
    selectedCategory == null
      ? products
      : products?.filter((p) => p.category?.id === selectedCategory);

  return (
    <div className="w-full space-y-6">
      <div className="w-full flex gap-3 overflow-x-auto pb-2">
        <Button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap border ${
            selectedCategory === null
              ? "bg-primary text-white"
              : "bg-white text-primary"
          }`}
        >
          Todas
        </Button>

        {categories?.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id!!)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap border ${
              selectedCategory === cat.id
                ? "bg-primary text-white"
                : "bg-white text-primary"
            }`}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <Card className="bg-primary text-white">
        <CardHeader>
          <CardTitle className="text-lg">TODOS OS PRODUTOS</CardTitle>
          <CardDescription className="text-white/70">
            Navegue por todos os nossos produtos e aproveite nossas ofertas!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Carousel className="w-full max-w-full overflow-hidden">
            <CarouselContent>
              {filteredProducts?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2"
                >
                  <ProductCard
                    product={product}
                    isFavorite={isFavorite(product.id!!)}
                    toggleFavorite={() => toggleFavorite(product.id!!)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
