import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Search, MoreVertical, ShieldCheck, User, Bike, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const dummyUsers = [
  { id: "USR-001", name: "Andi Saputra", email: "andi@gmail.com", role: "User", status: "Active", joined: "12 Jan 2024" },
  { id: "DRV-001", name: "Agus Santoso", email: "agus.driver@gmail.com", role: "Driver", status: "Active", joined: "15 Jan 2024" },
  { id: "USR-002", name: "Budi Santoso", email: "budi@yahoo.com", role: "User", status: "Suspended", joined: "20 Jan 2024" },
  { id: "ADM-001", name: "Admin Utama", email: "admin@klumpang.go", role: "Admin", status: "Active", joined: "01 Jan 2024" },
  { id: "DRV-002", name: "Siti Aminah", email: "siti.driver@gmail.com", role: "Driver", status: "Active", joined: "05 Feb 2024" },
];

export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Manajemen Pengguna</h1>
            <p className="text-muted-foreground font-medium">Kelola data pengguna, pengemudi, dan administrator Klumpang GO.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <UserPlus className="h-4 w-4" />
            Tambah Pengguna
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total User</p>
                <p className="text-2xl font-black">10,245</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
                <Bike className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Driver</p>
                <p className="text-2xl font-black">2,100</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-green-100 text-green-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Admin Aktif</p>
                <p className="text-2xl font-black">12</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Daftar Pengguna</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari nama atau email..." 
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Nama & ID</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Email</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Peran</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                    <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Bergabung</th>
                    <th className="pb-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dummyUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary shrink-0">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold leading-none">{user.name}</p>
                            <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-muted-foreground">{user.email}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                          user.role === "Admin" ? "bg-purple-100 text-purple-700" :
                          user.role === "Driver" ? "bg-orange-100 text-orange-700" :
                          "bg-blue-100 text-blue-700"
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            user.status === "Active" ? "bg-green-500" : "bg-destructive"
                          )} />
                          <span className="font-bold">{user.status}</span>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-muted-foreground">{user.joined}</td>
                      <td className="py-4 text-right">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
