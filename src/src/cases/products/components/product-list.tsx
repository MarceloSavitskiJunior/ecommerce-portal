import { CategoryCardList } from "../../categories/components/category-card-list";
import { useProducts } from "../hooks/use-product";
import { ProductCard } from "./product-card";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export function ProductList() {

  const allProductsQuery = useProducts();
  const products = allProductsQuery.data;
  const isLoading = allProductsQuery.isLoading;

  if (isLoading) return <p>Carregando produtos...</p>;

  return (
    <div className="w-full">
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
              {products?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

        </CardContent>
      </Card>

      <br />

      <Card className="bg-primary text-white">
        <CardHeader>
          <CardTitle className="text-lg">TODAS AS CATEGORIAS</CardTitle>
          <CardDescription className="text-white/70">
            Navegue por todas as nossas categorias e aproveite nossas ofertas!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <CategoryCardList />
        </CardContent>
      </Card>
    </div>
  );
}
