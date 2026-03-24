import ServiceLayout from "@/components/ServiceLayout";
import { useLocation } from "react-router-dom";
import { QrCode, ArrowUpCircle, Compass, Plus, History, LucideIcon } from "lucide-react";

const GoPayService = () => {
  const location = useLocation();
  const path = location.pathname.replace("/", "").toLowerCase();
  
  const services: Record<string, { title: string, icon: LucideIcon, color: string, desc: string }> = {
    "k-pay-pay": { title: "Bayar", icon: QrCode, color: "bg-gopay", desc: "Scan kode QR untuk melakukan pembayaran instan." },
    "k-pay-topup": { title: "Top Up", icon: ArrowUpCircle, color: "bg-gopay", desc: "Isi saldo K-Pay Anda melalui berbagai metode." },
    "k-pay-explore": { title: "Eksplor", icon: Compass, color: "bg-gopay", desc: "Temukan berbagai promo dan layanan menarik lainnya." },
    "k-pay-more": { title: "Lainnya", icon: Plus, color: "bg-gopay", desc: "Lihat semua layanan dan fitur K-Pay." },
    "k-pay-history": { title: "Riwayat Transaksi", icon: History, color: "bg-gopay", desc: "Lihat semua riwayat transaksi K-Pay Anda." }
  };

  const currentService = services[path] || { title: "K-Pay", icon: ArrowUpCircle, color: "bg-gopay", desc: "Layanan pembayaran digital terbaik untukmu." };
  const Icon = currentService.icon;

  return (
    <ServiceLayout title={currentService.title}>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className={`h-24 w-24 rounded-3xl ${currentService.color} flex items-center justify-center mb-6 shadow-lg`}>
          <Icon className="h-12 w-12 text-gopay-foreground" />
        </div>
        <h2 className="text-2xl font-black mb-3 tracking-tight">{currentService.title}</h2>
        <p className="text-muted-foreground leading-relaxed">{currentService.desc}</p>
        
        <div className="mt-12 w-full p-8 rounded-3xl bg-muted/50 border border-dashed border-muted-foreground/30">
          <p className="text-sm font-bold text-muted-foreground italic">Fitur K-Pay ini akan segera hadir.</p>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default GoPayService;
