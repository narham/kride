import { ClipboardList, ChevronRight, Bike, UtensilsCrossed, Car, Send } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const orders = [
  { id: "ORD-12345", service: "K-Ride", date: "24 Mar, 18:30", status: "Selesai", amount: "Rp 15.000", icon: Bike, color: "bg-primary" },
  { id: "ORD-12346", service: "K-Food", date: "24 Mar, 12:45", status: "Selesai", amount: "Rp 45.000", icon: UtensilsCrossed, color: "bg-destructive" },
  { id: "ORD-12347", service: "K-Car", date: "23 Mar, 09:15", status: "Dibatalkan", amount: "Rp 32.000", icon: Car, color: "bg-primary" },
  { id: "ORD-12348", service: "K-Send", date: "22 Mar, 15:20", status: "Selesai", amount: "Rp 12.000", icon: Send, color: "bg-primary" },
];

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">
        <h1 className="text-xl font-black tracking-tight mb-6">Pesanan Saya</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <button 
              key={order.id} 
              onClick={() => navigate(`/orders/${order.id}`)}
              className="w-full p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl text-white shadow-sm transition-transform group-hover:scale-110", order.color)}>
                  <order.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-black text-base tracking-tight leading-none">{order.service}</p>
                    <span className={cn(
                      "text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider",
                      order.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-black text-sm tracking-tight">{order.amount}</p>
                <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Belum ada pesanan</h1>
            <p className="text-sm text-muted-foreground mt-1">Pesanan kamu akan muncul di sini</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Orders;
