import DriverLayout from "@/components/driver/DriverLayout";
import { DollarSign, BarChart3, Star, MapPin, ChevronRight, Package, Bike, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const DriverHome = () => {
  const navigate = useNavigate();
  const summary = [
    { icon: DollarSign, label: "Pendapatan Hari Ini", value: "Rp 125.000", color: "text-green-600", bg: "bg-green-100", path: "/driver/earnings" },
    { icon: BarChart3, label: "Order Selesai", value: "12", color: "text-blue-600", bg: "bg-blue-100", path: "/driver/performance" },
    { icon: Star, label: "Rating Anda", value: "4.9", color: "text-orange-600", bg: "bg-orange-100", path: "/driver/performance" },
  ];

  const incomingOrders = [
    { id: "ORD-1234", type: "K-Ride", distance: "2.5 km", amount: "Rp 15.000", pickup: "Jl. Sudirman No. 12", destination: "Malioboro Mall", color: "bg-primary" },
    { id: "ORD-5678", type: "K-Food", distance: "1.2 km", amount: "Rp 12.000", pickup: "Ayam Geprek Bu Rum", destination: "Perumahan Indah Permai", color: "bg-destructive" },
  ];

  return (
    <DriverLayout>
      <div className="flex flex-col gap-8 p-4">
        {/* Today's Summary */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {summary.map((item) => (
            <div 
              key={item.label} 
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border/50 shadow-sm text-center cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <div className={cn("p-2 rounded-xl", item.bg)}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <div>
                 <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest leading-tight">{item.label}</p>
                 <p className="text-sm font-black tracking-tight leading-tight mt-1">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Available Orders Section */}
        <section aria-label="Order Masuk">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black tracking-tight">Order Masuk</h2>
            <button className="text-xs font-bold text-primary hover:underline">Lihat Semua</button>
          </div>

          <div className="space-y-4">
            {incomingOrders.map((order) => (
              <div 
                key={order.id} 
                onClick={() => navigate(`/orders/${order.id}`)}
                className="p-5 rounded-3xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2.5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform", order.color)}>
                      {order.type === "K-Ride" ? <Bike className="h-6 w-6 text-white" /> : <Package className="h-6 w-6 text-white" />}
                    </div>
                    <div>
                       <p className="text-sm font-black tracking-tight">{order.type}</p>
                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ID: {order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-primary leading-tight">{order.amount}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Jarak: {order.distance}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dashed border-border">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <div className="w-0.5 h-6 bg-muted-foreground/20 rounded-full" />
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Jemput</p>
                        <p className="text-sm font-bold leading-tight">{order.pickup}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Tujuan</p>
                        <p className="text-sm font-bold leading-tight">{order.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/orders/${order.id}`);
                  }}
                  className="w-full mt-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                >
                  Terima Order
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Overview */}
        <section aria-label="Ringkasan Performa">
           <div 
             onClick={() => navigate("/driver/performance")}
             className="p-6 rounded-3xl bg-muted/50 border border-border/50 flex items-center justify-between cursor-pointer hover:bg-muted/80 transition-all active:scale-95 shadow-sm"
           >
              <div className="flex gap-4 items-center">
                 <div className="p-3 rounded-2xl bg-white shadow-sm">
                    <BarChart3 className="h-8 w-8 text-primary" />
                 </div>
                 <div>
                    <h3 className="font-black text-base tracking-tight leading-tight">Performa Hari Ini</h3>
                    <p className="text-xs font-bold text-muted-foreground mt-1">Luar biasa! Pertahankan terus.</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-2xl font-black text-primary leading-tight">98%</p>
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target: 95%</p>
              </div>
           </div>
        </section>
      </div>
    </DriverLayout>
  );
};

export default DriverHome;
