import { Tag, Ticket, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const promos = [
  { id: 1, title: "K-Food Festival", desc: "Diskon hingga 60% makanan favorit kamu! 🍔", tag: "MAKANAN", color: "border-l-destructive", path: "/k-food" },
  { id: 2, title: "K-Ride Hemat Pagi", desc: "Potongan Rp15.000 sebelum jam 9 pagi 🏍️", tag: "TRANSPORT", color: "border-l-primary", path: "/k-ride" },
  { id: 3, title: "K-Pay Cashback", desc: "Cashback 25% setiap transaksi di merchant pilihan 💳", tag: "PEMBAYARAN", color: "border-l-gopay", path: "/k-pay-explore" },
  { id: 4, title: "K-Mart Gratis Ongkir", desc: "Gratis ongkir belanja kebutuhan harian 🛒", tag: "BELANJA", color: "border-l-accent", path: "/k-mart" },
  { id: 5, title: "K-Play Premium", desc: "Langganan 1 bulan hanya Rp29.000 🎬", tag: "HIBURAN", color: "border-l-accent", path: "/k-play" },
];

const Promo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            Promo untukmu
          </h1>
          <span className="text-[10px] font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-widest">
            5 Tersedia
          </span>
        </div>
        
        <div className="space-y-4">
          {promos.map((p) => (
            <button 
              key={p.id} 
              onClick={() => navigate(p.path)}
              className={cn(
                "w-full rounded-2xl bg-card p-5 shadow-sm border border-border/50 border-l-4 hover:shadow-md transition-all active:scale-[0.98] text-left flex items-center justify-between group",
                p.color
              )}
            >
              <div className="flex-1 pr-4">
                <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase">{p.tag}</span>
                <h3 className="text-base font-black text-card-foreground mt-1.5 leading-tight">{p.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1 leading-snug">{p.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-3xl bg-muted/50 border border-dashed border-muted-foreground/30 text-center">
          <p className="text-sm font-bold text-muted-foreground italic">Punya kode promo? Masukkan di sini.</p>
          <div className="mt-4 flex gap-2">
            <input 
              type="text" 
              placeholder="Contoh: KLUMPANGHEMAT" 
              className="flex-1 rounded-xl bg-card border border-border/50 px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-6 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">
              Pakai
            </button>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Promo;
