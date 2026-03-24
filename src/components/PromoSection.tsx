import { useNavigate } from "react-router-dom";

const promos = [
  { id: 1, title: "K-Food Deals", desc: "Diskon 50% makanan favorit!", tag: "MAKANAN", color: "border-l-destructive", path: "/k-food" },
  { id: 2, title: "K-Ride Hemat", desc: "Potongan Rp10.000 perjalanan", tag: "TRANSPORT", color: "border-l-primary", path: "/k-ride" },
  { id: 3, title: "K-Pay Cashback", desc: "Cashback 20% di merchant pilihan", tag: "PEMBAYARAN", color: "border-l-gopay", path: "/promo" },
  { id: 4, title: "K-Mart Gratis Ongkir", desc: "Belanja kebutuhan tanpa ongkir", tag: "BELANJA", color: "border-l-accent", path: "/k-mart" },
];

const PromoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-8 pb-24" aria-label="Promo Khusus">
      <div className="px-4 flex items-center justify-between mb-4">
        <h2 className="text-lg font-extrabold text-foreground tracking-tight">Promo untukmu</h2>
        <button 
          onClick={() => navigate("/promo")}
          className="text-sm font-bold text-primary hover:underline underline-offset-4 transition-all"
        >
          Lihat semua
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide snap-x snap-mandatory">
        {promos.map((promo) => (
          <div
            key={promo.id}
            onClick={() => navigate(promo.path)}
            className={`min-w-[260px] rounded-2xl bg-card p-5 shadow-sm border border-border/50 border-l-4 ${promo.color} flex-shrink-0 snap-start hover:shadow-md transition-shadow duration-300 cursor-pointer active:scale-[0.98]`}
          >
            <span className="text-[10px] font-extrabold text-muted-foreground tracking-widest uppercase">{promo.tag}</span>
            <h3 className="text-base font-bold text-card-foreground mt-1.5 leading-tight">{promo.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-snug">{promo.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;
