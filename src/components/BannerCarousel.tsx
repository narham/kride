import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const banners = [
  { id: 1, title: "K-Food Festival", subtitle: "Diskon hingga 60%! 🍔", gradient: "from-primary to-primary/70", path: "/k-food" },
  { id: 2, title: "K-Car Hemat", subtitle: "Cashback 30% dengan K-Pay 🚗", gradient: "from-gopay to-gopay/70", path: "/k-car" },
  { id: 3, title: "K-Mart Belanja", subtitle: "Gratis ongkir minimal 50rb 🛒", gradient: "from-destructive to-destructive/70", path: "/k-mart" },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-4 mt-6" aria-label="Banner Promosi">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full bg-gradient-to-br ${banner.gradient} p-6 flex flex-col justify-center min-h-[130px] transition-opacity duration-300`}
            >
              <h3 className="text-xl font-extrabold text-primary-foreground tracking-tight">{banner.title}</h3>
              <p className="text-sm font-medium text-primary-foreground/90 mt-1.5 leading-relaxed">{banner.subtitle}</p>
              <button 
                onClick={() => navigate(banner.path)}
                className="mt-3 w-fit rounded-full bg-primary-foreground/20 px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              >
                Cek Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerCarousel;
