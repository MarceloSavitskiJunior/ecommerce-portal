import bannerImg from "@/assets/banner-azul.png";

export function HeroBanner() {
  return (
    <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-xl group">

      <img
        src={bannerImg}
        alt="Banner"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10 dark:from-black/70 dark:via-black/50 dark:to-black/20" />

      <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/15 dark:bg-white/5 border border-white/20 rounded-xl px-4 py-2 shadow-lg">
        <h2 className="text-white font-semibold text-lg drop-shadow">
          Bem-vindo à MJ Shop
        </h2>
        <p className="text-white/80 text-sm">
          Os melhores produtos em um só lugar
        </p>
      </div>

    </div>
  );
}
