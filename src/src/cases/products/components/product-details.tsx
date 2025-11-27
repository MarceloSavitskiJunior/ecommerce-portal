import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { useProductById } from "../hooks/use-product";
import { Badge } from "lucide-react";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useProductById(id!);

  const [added, setAdded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!product?.photos || product.photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + 1 >= product.photos!.length ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product]);

  if (isLoading) return <p className="p-4">Carregando produto...</p>;
  if (!product) return <p className="p-4">Produto não encontrado.</p>;

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: product!!.id,
      name: product!!.name,
      price: product!!.price,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
  const images =product.photos?.map((p) => bucketBaseURL + p.path) ?? ["/placeholder.jpg"];

  function handleMouseMove(e: any) {
    const rect = imgRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomPos({ x, y, show: true });
  }

  function handleMouseLeave() {
    setZoomPos({ ...zoomPos, show: false });
  }

  const price = Number(product.price);
  const fakePrice = (price * 1.3).toFixed(2);
  const installments = 12;
  const installmentValue = (price / installments).toFixed(2);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <div>
              <div
                className="relative w-full flex items-center justify-center bg-white rounded-xl overflow-hidden h-80 border"
              >
                <img
                  ref={imgRef}
                  src={images[currentIndex]}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full h-full object-contain rounded-xl border shadow"
                />

                {zoomPos.show && (
                  <div
                    className="absolute pointer-events-none border-2 border-primary rounded-md"
                    style={{
                      width: "120px",
                      height: "120px",
                      top: zoomPos.y - 60,
                      left: zoomPos.x - 60,
                      backgroundColor: "rgba(255,255,255,0.3)",
                      backdropFilter: "blur(2px)",
                    }}
                  ></div>
                )}
              </div>

              {zoomPos.show && (
                <div className="hidden md:block w-full h-96 mt-4 border rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${images[currentIndex]})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "200%",
                      backgroundPosition: `${(zoomPos.x / imgRef.current!.clientWidth) * 100}% ${(zoomPos.y / imgRef.current!.clientHeight) * 100}%`,
                    }}
                  />
                </div>
              )}

              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map((img, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`
                      border rounded-md w-20 h-20 flex-shrink-0 overflow-hidden p-0
                      transition ring-offset-2
                      ${i === currentIndex ? "ring-2 ring-primary" : "border-gray-300"}
                    `}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                    />
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {product.category && (
                  <Badge>{product.category.name}</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              <div>
                <p className="text-gray-400 line-through">R$ {fakePrice}</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {price.toFixed(2)}
                </p>
                <p className="text-gray-700">
                  {installments}x de{" "}
                  <span className="font-medium">R$ {installmentValue}</span>
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {product.description ?? "Este produto ainda não possui descrição."}
              </p>

              <Button onClick={addToCart} className="w-full md:w-1/2 mt-4 cursor-pointer">
                {added ? "Adicionado!" : "Adicionar ao carrinho"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
