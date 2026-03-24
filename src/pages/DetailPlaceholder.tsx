import ServiceLayout from "@/components/ServiceLayout";
import { useParams } from "react-router-dom";
import { Info, Clock, MapPin, CreditCard, ShieldCheck } from "lucide-react";

const DetailPlaceholder = () => {
  const { id } = useParams();
  const type = id?.split("-")[0] || "Detail";

  return (
    <ServiceLayout title={`${type} #${id}`}>
      <div className="flex flex-col gap-8">
        <div className="p-8 rounded-3xl bg-muted/50 border border-dashed border-muted-foreground/30 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-black tracking-tight mb-2">Informasi {type}</h2>
          <p className="text-sm text-muted-foreground">Halaman detail untuk {id} akan segera hadir dengan informasi lengkap.</p>
        </div>

        <div className="space-y-4">
           <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Waktu</p>
                 <p className="text-sm font-bold">24 Maret 2026, 18:30</p>
              </div>
           </div>
           <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Lokasi</p>
                 <p className="text-sm font-bold">Jl. Sudirman No. 123, Jakarta</p>
              </div>
           </div>
           <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Metode Pembayaran</p>
                 <p className="text-sm font-bold">K-Pay</p>
              </div>
           </div>
           <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <div>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Keamanan</p>
                 <p className="text-sm font-bold">Terlindungi oleh Klumpang Shield</p>
              </div>
           </div>
        </div>

        <button className="w-full py-4 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all mt-4">
           Bantuan Layanan
        </button>
      </div>
    </ServiceLayout>
  );
};

export default DetailPlaceholder;
