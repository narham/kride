import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { User, Bell, Search } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-card px-8">
          <div className="flex flex-1 max-w-md items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari pesanan, pengguna, atau layanan..."
              className="w-full rounded-full bg-muted pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors active:scale-95">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
            </button>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right">
                <p className="text-sm font-bold">Admin Utama</p>
                <p className="text-[10px] text-muted-foreground">Super Admin</p>
              </div>
              <button className="h-10 w-10 rounded-full border-2 border-primary p-0.5 hover:bg-primary/10 transition-colors overflow-hidden">
                <User className="h-full w-full text-primary" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
