import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Plus, Search, MoreVertical, Bike, UtensilsCrossed, Car, Send, ShoppingCart, Play, Pill, Star, Truck, SwitchCamera } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

const dummyServices = [
  { id: "SVC-001", name: "K-Ride", category: "Transport", basePrice: "Rp 10.000", status: true, icon: Bike, color: "bg-primary" },
  { id: "SVC-002", name: "K-Car", category: "Transport", basePrice: "Rp 25.000", status: true, icon: Car, color: "bg-primary" },
  { id: "SVC-003", name: "K-Food", category: "Delivery", basePrice: "Rp 15.000", status: true, icon: UtensilsCrossed, color: "bg-destructive" },
  { id: "SVC-004", name: "K-Send", category: "Delivery", basePrice: "Rp 8.000", status: true, icon: Send, color: "bg-primary" },
  { id: "SVC-005", name: "K-Mart", category: "Shopping", basePrice: "Rp 12.000", status: false, icon: ShoppingCart, color: "bg-destructive" },
];

export default function AdminServices() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Manajemen Layanan</h1>
            <p className="text-muted-foreground font-medium">Konfigurasi tarif, status aktif, dan parameter setiap layanan Klumpang GO.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            Tambah Layanan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyServices.map((service) => (
            <Card key={service.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <div className={cn("h-1.5 w-full", service.color)} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl text-white shadow-sm", service.color)}>
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{service.name}</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest">{service.category}</CardDescription>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center py-2 border-b border-dashed">
                    <span className="text-sm font-medium text-muted-foreground">Harga Dasar</span>
                    <span className="text-sm font-black">{service.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">Status Layanan</span>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-tighter",
                        service.status ? "text-green-600" : "text-destructive"
                      )}>
                        {service.status ? "Aktif & Tersedia" : "Nonaktif / Maintenance"}
                      </span>
                    </div>
                    <Switch checked={service.status} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Pengaturan Global Tarif</CardTitle>
            <CardDescription>Sesuaikan biaya tambahan berdasarkan waktu atau kondisi cuaca.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 text-primary">
                  <Play className="h-5 w-5 rotate-90" />
                  <h3 className="font-black text-sm uppercase tracking-widest">Jam Sibuk (Peak Hours)</h3>
                </div>
                <p className="text-xs text-muted-foreground">Otomatis menaikkan tarif sebesar 1.5x pada pukul 17:00 - 20:00.</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold">Aktifkan Fitur</span>
                  <Switch checked={true} />
                </div>
              </div>
              <div className="space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 text-primary">
                  <Play className="h-5 w-5 rotate-90" />
                  <h3 className="font-black text-sm uppercase tracking-widest">Cuaca Buruk (Rain Surcharge)</h3>
                </div>
                <p className="text-xs text-muted-foreground">Tambahan biaya Rp 5.000 untuk driver saat kondisi hujan deras.</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold">Aktifkan Fitur</span>
                  <Switch checked={false} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
