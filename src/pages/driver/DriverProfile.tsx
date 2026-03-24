import DriverLayout from "@/components/driver/DriverLayout";
import { User, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Settings, Info, MapPin, Smartphone, Truck, ShieldCheck, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const DriverProfile = () => {
  const navigate = useNavigate();

  const profileItems = [
    { icon: User, label: "Profil Saya", desc: "Data diri & dokumen" },
    { icon: Shield, label: "Keamanan Akun", desc: "PIN, Sandi & Biometrik" },
    { icon: CreditCard, label: "Pembayaran", desc: "Dompet Driver & Rekening" },
    { icon: Settings, label: "Preferensi Aplikasi", desc: "Notifikasi & Bahasa" },
    { icon: HelpCircle, label: "Bantuan & Laporan", desc: "Bantuan & Layanan" },
    { icon: Info, label: "Tentang Aplikasi", desc: "Versi 4.5.2" },
  ];

  return (
    <DriverLayout>
      <div className="flex flex-col gap-8 p-4">
        {/* User Profile Header */}
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="relative mb-4 group cursor-pointer" onClick={() => navigate("/driver/profile/edit")}>
             <div className="h-28 w-28 rounded-full border-4 border-primary p-1 shadow-xl transition-transform group-hover:scale-105">
                <div className="h-full w-full rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-white shadow-inner">
                   <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Agus Santoso" className="h-full w-full object-cover" />
                </div>
             </div>
             <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center border-4 border-card shadow-lg shadow-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary-foreground" />
             </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-tight">Agus Santoso</h1>
          <p className="text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest">+62 812 3456 7890</p>
          <div className="flex items-center gap-2 mt-4">
             <div className="px-3 py-1.5 rounded-full bg-muted border border-border/50 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-orange-500 fill-orange-500" />
                <span className="text-[10px] font-black tracking-tight">Level 12 • Pro Driver</span>
             </div>
          </div>
        </div>

        {/* Vehicle Information Placeholder */}
        <section aria-label="Informasi Kendaraan">
           <div className="p-6 rounded-3xl bg-muted/50 border border-border/50 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-muted/80 transition-all">
              <div className="flex gap-4 items-center">
                 <div className="p-3 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform">
                    <Truck className="h-8 w-8 text-primary" />
                 </div>
                 <div>
                    <h3 className="font-black text-base tracking-tight leading-tight">Kendaraan Aktif</h3>
                    <p className="text-xs font-bold text-muted-foreground mt-1">Honda Vario • AB 1234 XY</p>
                 </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
           </div>
        </section>

        {/* Profile Menu Items */}
        <div className="space-y-3">
          {profileItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:bg-muted/50 transition-all text-left shadow-sm group active:scale-[0.98]">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-black text-base leading-tight tracking-tight">{item.label}</p>
                <p className="text-xs font-bold text-muted-foreground mt-1 tracking-tight">{item.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}

          {/* Switch to User App Link */}
          <Link 
            to="/" 
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-left shadow-lg active:scale-[0.98] mt-8 group"
          >
            <div className="p-3 rounded-xl bg-white/20 shadow-inner group-hover:scale-110 transition-transform">
              <User className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-black text-base leading-tight tracking-tight uppercase tracking-widest">Kembali ke Klumpang GO</p>
              <p className="text-xs font-medium text-white/80 mt-1 tracking-tight">Pesan layanan Klumpang</p>
            </div>
            <ChevronRight className="h-5 w-5 text-white/50 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Logout Button */}
          <button 
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all text-left mt-4 active:scale-[0.98] group"
          >
            <LogOut className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <p className="font-black text-base uppercase tracking-widest">Keluar Akun</p>
          </button>
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverProfile;
