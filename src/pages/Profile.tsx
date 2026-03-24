import ServiceLayout from "@/components/ServiceLayout";
import { User, Shield, CreditCard, HelpCircle, LogOut, Bike } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const menuItems = [
    { icon: Shield, label: "Keamanan Akun", desc: "Ubah PIN, Sandi, & Biometrik" },
    { icon: CreditCard, label: "Metode Pembayaran", desc: "Atur GoPay, Kartu, & Bank" },
    { icon: HelpCircle, label: "Bantuan & Laporan", desc: "Butuh bantuan? Kami di sini." },
  ];

  return (
    <ServiceLayout title="Profil Saya">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="h-28 w-28 rounded-full border-4 border-primary p-1 mb-4 shadow-lg">
            <div className="h-full w-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
               <User className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Pengguna Klumpang GO</h2>
          <p className="text-sm font-bold text-muted-foreground">+62 812 3456 7890</p>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:bg-muted/50 transition-all text-left shadow-sm active:scale-[0.98]">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base leading-tight">{item.label}</p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
          
          <Link 
            to="/driver" 
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-all text-left shadow-md active:scale-[0.98]"
          >
            <div className="p-2.5 rounded-xl bg-white/20">
              <Bike className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base leading-tight">Klumpang Driver</p>
              <p className="text-xs font-medium text-white/80 mt-0.5">Mulai cari pendapatan</p>
            </div>
          </Link>

          <Link 
            to="/admin" 
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-left shadow-md active:scale-[0.98]"
          >
            <div className="p-2.5 rounded-xl bg-white/20">
              <Shield className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-base leading-tight">Klumpang Admin</p>
              <p className="text-xs font-medium text-white/80 mt-0.5">Akses fitur manajemen aplikasi</p>
            </div>
          </Link>

          <button 
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-4 p-5 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all text-left mt-8 active:scale-[0.98]"
          >
            <LogOut className="h-6 w-6" />
            <p className="font-black text-base uppercase tracking-widest">Keluar Akun</p>
          </button>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default Profile;
