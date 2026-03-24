import ServiceLayout from "@/components/ServiceLayout";
import { CreditCard, Landmark, Smartphone, Store, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TopUp = () => {
  const { toast } = useToast();

  const methods = [
    { icon: Landmark, name: "Transfer Bank", desc: "BCA, Mandiri, BNI, dll", color: "text-blue-600", bg: "bg-blue-100" },
    { icon: Store, name: "Gerai Retail", desc: "Alfamart, Indomaret", color: "text-orange-600", bg: "bg-orange-100" },
    { icon: Smartphone, name: "OneKlik", desc: "Isi saldo instan", color: "text-primary", bg: "bg-primary/10" },
  ];

  const handleTopUp = (amount: string) => {
    toast({
      title: "Instruksi Terkirim",
      description: `Silakan selesaikan pembayaran Rp ${amount} melalui metode pilihan Anda.`,
    });
  };

  return (
    <ServiceLayout title="Top Up K-Pay">
      <div className="flex flex-col gap-8">
        <div className="p-8 rounded-3xl bg-gopay text-white shadow-xl shadow-gopay/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">Saldo Saat Ini</p>
            <p className="text-4xl font-black tracking-tighter">Rp 1.250.000</p>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-white/10 skew-x-[-15deg] translate-x-1/2 blur-2xl" />
        </div>

        <section>
          <h2 className="text-lg font-black tracking-tight mb-4 px-2">Pilih Nominal</h2>
          <div className="grid grid-cols-3 gap-3">
            {["50.000", "100.000", "200.000", "500.000", "1.000.000", "Lainnya"].map((amount) => (
              <button 
                key={amount}
                onClick={() => amount !== "Lainnya" && handleTopUp(amount)}
                className="py-4 rounded-2xl border border-border/50 bg-card font-black text-sm hover:border-primary hover:text-primary transition-all active:scale-95 shadow-sm"
              >
                {amount === "Lainnya" ? amount : `Rp ${amount.split(".")[0]}rb`}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-black tracking-tight mb-4 px-2">Metode Lainnya</h2>
          <div className="space-y-3">
            {methods.map((method) => (
              <button key={method.name} className="w-full p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-between text-left group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${method.bg} ${method.color}`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-base tracking-tight leading-none">{method.name}</p>
                    <p className="text-xs font-medium text-muted-foreground mt-1">{method.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
};

export default TopUp;
