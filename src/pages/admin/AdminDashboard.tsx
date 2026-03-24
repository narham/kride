import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, Package, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Pengguna", value: "12,345", icon: Users, change: "+12.5%", color: "text-blue-500", bg: "bg-blue-100", path: "/admin/users" },
  { label: "Total Pesanan", value: "1,240", icon: ClipboardList, change: "+5.2%", color: "text-green-500", bg: "bg-green-100", path: "/admin/orders" },
  { label: "Total Layanan", value: "12", icon: Package, change: "0%", color: "text-orange-500", bg: "bg-orange-100", path: "/admin/services" },
  { label: "Total Pendapatan", value: "Rp 125,4M", icon: DollarSign, change: "+18.2%", color: "text-purple-500", bg: "bg-purple-100", path: "/admin/earnings" },
];

const recentOrders = [
  { id: "ORD-001", user: "Andi Saputra", service: "K-Ride", status: "Completed", amount: "Rp 15.000", time: "2 menit yang lalu" },
  { id: "ORD-002", user: "Budi Santoso", service: "K-Food", status: "In Progress", amount: "Rp 45.000", time: "5 menit yang lalu" },
  { id: "ORD-003", user: "Citra Lestari", service: "K-Car", status: "Cancelled", amount: "Rp 32.000", time: "10 menit yang lalu" },
  { id: "ORD-004", user: "Dewi Putri", service: "K-Send", status: "Completed", amount: "Rp 12.000", time: "15 menit yang lalu" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Overview Dashboard</h1>
          <p className="text-muted-foreground font-medium">Selamat datang kembali, Admin! Berikut ringkasan aplikasi hari ini.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card 
              key={stat.label} 
              className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              onClick={() => navigate(stat.path)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-bold ${stat.change.startsWith("+") ? "text-green-600" : "text-muted-foreground"}`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-black mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold">Pesanan Terbaru</CardTitle>
              <button 
                onClick={() => navigate("/admin/orders")}
                className="text-sm font-bold text-primary hover:underline underline-offset-4"
              >
                Lihat Semua
              </button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 font-bold">ID PESANAN</th>
                      <th className="pb-3 font-bold">PENGGUNA</th>
                      <th className="pb-3 font-bold">LAYANAN</th>
                      <th className="pb-3 font-bold">STATUS</th>
                      <th className="pb-3 font-bold">JUMLAH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentOrders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <td className="py-4 font-bold">{order.id}</td>
                        <td className="py-4">{order.user}</td>
                        <td className="py-4 font-medium">{order.service}</td>
                        <td className="py-4">
                          <span className={cn(
                            "rounded-full px-2 py-1 text-[10px] font-extrabold uppercase",
                            order.status === "Completed" ? "bg-green-100 text-green-700" :
                            order.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 font-bold">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Grafik Pertumbuhan</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
                <p className="text-sm font-bold text-muted-foreground">Visualisasi data akan ditampilkan di sini.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
