import ServiceLayout from "@/components/ServiceLayout";
import { Bike } from "lucide-react";

const GoRide = () => {
  return (
    <ServiceLayout title="K-Ride">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-lg">
          <Bike className="h-12 w-12 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Mau ke mana hari ini?</h2>
        <p className="text-muted-foreground mb-8">Pilih tujuanmu dan nikmati perjalanan aman dengan K-Ride.</p>
        <div className="w-full space-y-4">
          <div className="p-4 rounded-2xl bg-muted border border-border/50 text-left">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Lokasi Jemput</p>
            <p className="font-bold">Posisi Saat Ini</p>
          </div>
          <div className="p-4 rounded-2xl bg-muted border border-border/50 text-left">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Tujuan</p>
            <p className="font-bold text-muted-foreground/50">Mau pergi ke mana?</p>
          </div>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default GoRide;
