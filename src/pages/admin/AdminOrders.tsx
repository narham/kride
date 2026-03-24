import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Search, Filter, Download, MoreVertical, Bike, UtensilsCrossed, Car, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyOrders = [
  { id: "ORD-001", customer: "Andi Saputra", driver: "Agus Santoso", service: "K-Ride", status: "Completed", amount: "Rp 15.000", time: "18:30, 24 Mar" },
  { id: "ORD-002", customer: "Budi Santoso", driver: "Siti Aminah", service: "K-Food", status: "In Progress", amount: "Rp 45.000", time: "12:45, 24 Mar" },
  { id: "ORD-003", customer: "Citra Lestari", driver: "-", service: "K-Car", status: "Cancelled", amount: "Rp 32.000", time: "09:15, 23 Mar" },
  { id: "ORD-004", customer: "Dewi Putri", driver: "Agus Santoso", service: "K-Send", status: "Completed", amount: "Rp 12.000", time: "15:20, 22 Mar" },
  { id: "ORD-005", customer: "Eko Prasetyo", driver: "Siti Aminah", service: "K-Ride", status: "Completed", amount: "Rp 18.000", time: "10:00, 22 Mar" },
];

const getServiceIcon = (service: string) => {
  switch (service) {
    case "K-Ride": return Bike;
    case "K-Food": return UtensilsCrossed;
    case "K-Car": return Car;
    case "K-Send": return Send;
    default: return ClipboardList;
  }
};

const getServiceColor = (service: string) => {
  switch (service) {
    case "K-Food": return "bg-destructive text-white";
    default: return "bg-primary text-white";
  }
};

export default function AdminOrders() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Manajemen Pesanan</h1>
            <p className="text-muted-foreground font-medium">Pantau dan kelola seluruh transaksi layanan Klumpang GO.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl font-bold text-sm hover:bg-muted/80 transition-all border border-border/50">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Pesanan Hari Ini", value: "124", color: "text-blue-600" },
            { label: "Sedang Berjalan", value: "18", color: "text-orange-600" },
            { label: "Selesai", value: "98", color: "text-green-600" },
            { label: "Dibatalkan", value: "8", color: "text-destructive" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <p className={cn("text-2xl font-black mt-1", stat.color)}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg font-bold">Riwayat Transaksi</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Cari ID atau Nama..." 
                  className="pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors border border-border/50">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">ID & Waktu</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Layanan</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Pelanggan</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Driver</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Jumlah</th>
                    <th className="pb-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dummyOrders.map((order) => {
                    const Icon = getServiceIcon(order.service);
                    return (
                      <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-4">
                          <p className="font-bold leading-none">{order.id}</p>
                          <p className="text-[10px] text-muted-foreground font-medium mt-1">{order.time}</p>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className={cn("p-1.5 rounded-lg", getServiceColor(order.service))}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-bold text-xs">{order.service}</span>
                          </div>
                        </td>
                        <td className="py-4 font-medium">{order.customer}</td>
                        <td className="py-4 font-medium text-muted-foreground">{order.driver}</td>
                        <td className="py-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider",
                            order.status === "Completed" ? "bg-green-100 text-green-700" :
                            order.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 font-black">{order.amount}</td>
                        <td className="py-4 text-right">
                          <button className="p-2 hover:bg-muted rounded-full transition-colors">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
