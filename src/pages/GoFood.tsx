import ServiceLayout from "@/components/ServiceLayout";
import { UtensilsCrossed, Search, MapPin } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import LocationSearch from "@/components/LocationSearch";
import { useState } from "react";

const GoFood = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([-6.200000, 106.816666]);
  const [address, setAddress] = useState("Rumah • Jl. Sudirman No. 123...");

  const handleLocationSelect = (lat: number, lng: number, addr: string) => {
    setMapCenter([lat, lng]);
    setAddress(addr);
  };

  return (
    <ServiceLayout title="K-Food">
      <div className="flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Mau makan apa hari ini?"
            className="w-full rounded-2xl bg-muted pl-12 pr-4 py-4 text-sm font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          />
        </div>

        {/* Delivery Location Map */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Antar ke</h3>
            <button className="text-xs font-bold text-primary">Ubah Alamat</button>
          </div>
          
          <div className="space-y-4">
            <LocationSearch 
              onSelect={handleLocationSelect} 
              placeholder="Cari alamat pengantaran..."
            />
            
            <div className="relative h-[150px] rounded-2xl overflow-hidden border border-border/50">
              <MapComponent height="150px" center={mapCenter} markers={[{ lat: mapCenter[0], lng: mapCenter[1] }]} />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm flex items-center gap-3 z-[1000]">
                <MapPin className="h-4 w-4 text-destructive shrink-0" />
                <p className="text-[10px] font-bold truncate">{address}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center py-8 text-center bg-destructive/10 rounded-3xl p-6 border border-destructive/20">
          <div className="h-20 w-20 rounded-2xl bg-destructive flex items-center justify-center mb-4 shadow-lg">
            <UtensilsCrossed className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-black mb-2 tracking-tight">Cari Makanan Favorit</h2>
          <p className="text-sm text-muted-foreground">Berbagai pilihan restoran lezat menantimu di K-Food.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-video rounded-2xl bg-orange-100 flex items-center justify-center p-4 border border-orange-200">
             <span className="text-sm font-black text-orange-700 uppercase tracking-tighter">Diskon Kilat</span>
          </div>
          <div className="aspect-video rounded-2xl bg-blue-100 flex items-center justify-center p-4 border border-blue-200">
             <span className="text-sm font-black text-blue-700 uppercase tracking-tighter">Gratis Ongkir</span>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default GoFood;
