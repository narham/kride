import ServiceLayout from "@/components/ServiceLayout";
import { useSearchParams } from "react-router-dom";
import { Search, Bike, UtensilsCrossed, Car, Send, ShoppingCart, ShoppingBag } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = [
    { name: "K-Ride", desc: "Transportasi motor instan", icon: Bike, color: "bg-primary" },
    { name: "K-Food", desc: "Pesan makanan favoritmu", icon: UtensilsCrossed, color: "bg-destructive" },
    { name: "K-Car", desc: "Transportasi mobil nyaman", icon: Car, color: "bg-primary" },
    { name: "K-Send", desc: "Kirim paket kilat", icon: Send, color: "bg-primary" },
    { name: "K-Mart", desc: "Belanja kebutuhan harian", icon: ShoppingCart, color: "bg-destructive" },
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <ServiceLayout title={`Hasil cari: ${query}`}>
      <div className="flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            defaultValue={query}
            placeholder="Cari layanan lainnya..."
            className="w-full rounded-2xl bg-muted pl-12 pr-4 py-4 text-sm font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>

        <div className="space-y-3">
          {results.map((item) => (
            <button key={item.name} className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:bg-muted/50 transition-all text-left shadow-sm active:scale-[0.98] group">
              <div className={`p-3 rounded-xl ${item.color} text-white group-hover:scale-110 transition-transform`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base leading-tight">{item.name}</p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}

          {results.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground font-bold">Tidak ada hasil ditemukan untuk "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </ServiceLayout>
  );
};

export default SearchResults;
