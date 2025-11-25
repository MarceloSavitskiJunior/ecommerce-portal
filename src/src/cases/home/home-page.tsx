import { ProductList } from "../products/components/product-list";
import { HeroBanner } from "./components/hero-banner";


export function HomePage() {
  return (
    <div className="space-y-8 p-4">

      <HeroBanner />
      <ProductList />

    </div>
  );
}
