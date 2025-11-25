import bannerImg from "@/assets/banner.png";

export function HeroBanner() {
  return (
    <div
      className="w-full h-56 rounded-xl flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
        Bem-vindo ao Nosso E-commerce
      </h1>
    </div>
  );
}
