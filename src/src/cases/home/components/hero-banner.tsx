import bannerImg from "@/assets/banner.png";

export function HeroBanner() {
  return (
    <div className="w-full h-56 rounded-xl overflow-hidden">
      <img 
        src={bannerImg} 
        alt="Banner" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}

