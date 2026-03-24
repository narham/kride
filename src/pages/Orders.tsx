import { ClipboardList, ChevronRight, Bike, UtensilsCrossed, Car, Send, Loader2 } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();

    // Realtime subscription for order updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          console.log('Change received!', payload);
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Fallback dummy data if table doesn't exist yet
      setOrders([
        { id: "ORD-12345", service: "K-Ride", date: "24 Mar, 18:30", status: "Selesai", amount: "Rp 15.000", service_type: "ride" },
        { id: "ORD-12346", service: "K-Food", date: "24 Mar, 12:45", status: "Selesai", amount: "Rp 45.000", service_type: "food" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'food': return UtensilsCrossed;
      case 'car': return Car;
      case 'send': return Send;
      default: return Bike;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'food': return "bg-destructive";
      default: return "bg-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">
        <h1 className="text-xl font-black tracking-tight mb-6">Pesanan Saya</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-sm font-bold text-muted-foreground uppercase tracking-widest">Memuat Pesanan...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const Icon = getServiceIcon(order.service_type || 'ride');
              const color = getServiceColor(order.service_type || 'ride');
              return (
                <button 
                  key={order.id} 
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="w-full p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-2xl text-white shadow-sm transition-transform group-hover:scale-110", color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-black text-base tracking-tight leading-none">{order.service || (order.service_type === 'ride' ? 'K-Ride' : 'K-Food')}</p>
                        <span className={cn(
                          "text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider",
                          order.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{order.date || new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-black text-sm tracking-tight">{order.amount}</p>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {!isLoading && orders.length === 0 && (
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
