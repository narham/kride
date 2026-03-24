import DriverLayout from "@/components/driver/DriverLayout";
import { DollarSign, ChevronRight, TrendingUp, Calendar, CreditCard, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const DriverEarnings = () => {
  const { toast } = useToast();

  const handleWithdraw = () => {
    toast({
      title: "Penarikan Diproses",
      description: "Saldo akan dikirim ke rekening bank Anda dalam waktu 1x24 jam.",
    });
  };

  const earningsHistory = [
    { id: 1, date: "Hari ini", amount: "Rp 125.000", orders: 12, status: "Sudah Cair" },
    { id: 2, date: "Kemarin", amount: "Rp 150.000", orders: 15, status: "Sudah Cair" },
    { id: 3, date: "Senin, 23 Mar", amount: "Rp 95.000", orders: 8, status: "Sudah Cair" },
    { id: 4, date: "Minggu, 22 Mar", amount: "Rp 210.000", orders: 18, status: "Sudah Cair" },
  ];

  return (
    <DriverLayout>
      <div className="flex flex-col gap-8 p-4">
        {/* Wallet Balance Card */}
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 shadow-xl shadow-primary/20">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-primary-foreground/70 uppercase tracking-widest leading-none mb-2">Saldo Dompet Driver</p>
                <p className="text-4xl font-black text-primary-foreground tracking-tighter">Rp 2.450.000</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg backdrop-blur-md">
                <CreditCard className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleWithdraw}
                className="flex-1 py-4 rounded-2xl bg-white text-primary font-black text-sm uppercase tracking-widest shadow-md hover:bg-white/90 transition-all active:scale-95"
              >
                Tarik Saldo
              </button>
              <button className="p-4 rounded-2xl bg-white/20 text-primary-foreground font-black text-sm uppercase tracking-widest shadow-md hover:bg-white/30 transition-all active:scale-95 flex items-center justify-center">
                 <ArrowRightLeft className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-white/10 skew-x-[-15deg] translate-x-1/2 blur-2xl" />
        </div>

        {/* Weekly Chart Placeholder */}
        <section aria-label="Analisis Pendapatan">
          <div className="p-6 rounded-3xl bg-card border border-border/50 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                   <TrendingUp className="h-5 w-5 text-primary" />
                   Minggu Ini
                </h2>
                <button className="text-xs font-bold text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
                   <Calendar className="h-4 w-4" />
                   24 Mar - 30 Mar
                </button>
             </div>
             <div className="h-48 w-full flex items-end justify-between gap-2 px-2">
                {[45, 60, 30, 80, 50, 90, 70].map((height, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                         className={cn("w-full rounded-t-xl transition-all duration-500 group-hover:bg-primary/80 cursor-pointer", i === 5 ? "bg-primary shadow-lg shadow-primary/20" : "bg-muted-foreground/20")} 
                         style={{ height: `${height}%` }}
                      />
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{['S', 'S', 'R', 'K', 'J', 'S', 'M'][i]}</span>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* Transaction History List */}
        <section aria-label="Riwayat Pendapatan">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black tracking-tight">Riwayat Harian</h2>
            <button className="text-xs font-bold text-primary hover:underline transition-all">Lihat Semua</button>
          </div>
          <div className="space-y-3">
            {earningsHistory.map((item) => (
              <button key={item.id} className="w-full p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group flex items-center justify-between text-left">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                    <DollarSign className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-black text-base tracking-tight leading-tight">{item.date}</p>
                    <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest">{item.orders} Order • {item.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-black text-lg text-primary tracking-tight">{item.amount}</p>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </DriverLayout>
  );
};

export default DriverEarnings;
