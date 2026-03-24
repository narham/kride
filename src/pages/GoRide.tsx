import ServiceLayout from "@/components/ServiceLayout";
import { Bike } from "lucide-react";
import MapComponent from "@/components/MapComponent";
import LocationSearch from "@/components/LocationSearch";
import { useState } from "react";

const GoRide = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([-6.200000, 106.816666]);
  const [destination, setDestination] = useState("");

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setMapCenter([lat, lng]);
    setDestination(address);
  };

  return (
    <ServiceLayout title="K-Ride">
      <div className="flex flex-col gap-6">
        {/* Map Integration */}
        <MapComponent height="250px" center={mapCenter} markers={[{ lat: mapCenter[0], lng: mapCenter[1] }]} />

        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg">
            <Bike className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-1">Mau ke mana hari ini?</h2>
          <p className="text-sm text-muted-foreground mb-6">Pilih tujuanmu dan nikmati perjalanan aman dengan K-Ride.</p>
          
          <div className="w-full space-y-4">
            <div className="p-4 rounded-2xl bg-muted border border-border/50 text-left">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Lokasi Jemput</p>
              <p className="text-sm font-bold">Posisi Saat Ini</p>
            </div>
            
            <div className="space-y-2 text-left">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">Tujuan</p>
              <LocationSearch 
                onSelect={handleLocationSelect} 
                placeholder="Cari lokasi tujuan..."
              />
            </div>
          </div>

          <button className="w-full mt-8 py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Cari Driver K-Ride
          </button>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default GoRide;
