import DriverLayout from "@/components/driver/DriverLayout";
import { BarChart3, Star, Clock, CheckCircle2, AlertTriangle, ShieldCheck, TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const DriverPerformance = () => {
  const metrics = [
    { icon: CheckCircle2, label: "Tingkat Penyelesaian", value: "98%", status: "Sangat Baik", color: "text-green-600", bg: "bg-green-100" },
    { icon: Clock, label: "Waktu Tunggu Rata-rata", value: "3.5m", status: "Efisien", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: AlertTriangle, label: "Tingkat Pembatalan", value: "2%", status: "Rendah", color: "text-destructive", bg: "bg-destructive/10" },
    { icon: Star, label: "Rating Keseluruhan", value: "4.92", status: "Sangat Baik", color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <DriverLayout>
      <div className="flex flex-col gap-8 p-4">
        {/* Profile Card Summary */}
        <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-md flex items-center gap-6">
           <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-primary p-1 shadow-lg">
                 <div className="h-full w-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Agus Santoso" className="h-full w-full object-cover" />
                 </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-primary flex items-center justify-center border-4 border-card shadow-lg">
                 <ShieldCheck className="h-5 w-5 text-primary-foreground" />
              </div>
           </div>
           <div>
              <h1 className="text-2xl font-black tracking-tight leading-tight">Agus Santoso</h1>
              <p className="text-sm font-bold text-muted-foreground mt-1 tracking-tight">Driver Sejak Jan 2024</p>
              <div className="flex items-center gap-2 mt-3 p-1.5 px-3 rounded-full bg-muted w-fit border border-border/50">
                 <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                 <span className="text-xs font-black tracking-tight">Pro Driver</span>
              </div>
           </div>
        </div>

        {/* Performance Metrics Grid */}
        <section aria-label="Metrik Performa">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                 <TrendingUp className="h-5 w-5 text-primary" />
                 Metrik Performa
              </h2>
              <button className="text-xs font-bold text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors">
                 <Info className="h-4 w-4" />
                 Selengkapnya
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric) => (
                 <div key={metric.label} className="p-5 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group flex flex-col gap-3">
                    <div className={cn("p-2.5 rounded-xl w-fit group-hover:scale-110 transition-transform", metric.bg)}>
                       <metric.icon className={cn("h-6 w-6", metric.color)} />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">{metric.label}</p>
                       <p className="text-2xl font-black tracking-tight leading-tight">{metric.value}</p>
                       <p className={cn("text-[10px] font-bold mt-2 uppercase tracking-widest", metric.color)}>{metric.status}</p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* Rewards Section Placeholder */}
        <section aria-label="Program Hadiah">
           <div className="p-8 rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-xl font-black tracking-tight leading-tight">Program Hadiah K-Driver</h3>
                 <p className="text-sm font-medium text-primary-foreground/80 mt-2 max-w-[80%]">Tingkatkan performa Anda dan dapatkan bonus mingguan hingga Rp 500.000!</p>
                 <button className="mt-6 px-6 py-3 rounded-2xl bg-white text-primary font-black text-xs uppercase tracking-widest shadow-lg hover:bg-white/90 transition-all active:scale-95">
                    Lihat Program
                 </button>
              </div>
              <div className="absolute -bottom-8 -right-8 h-32 w-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-[-15deg] translate-x-1/2 blur-2xl" />
           </div>
        </section>
      </div>
    </DriverLayout>
  );
};

export default DriverPerformance;
