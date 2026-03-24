import { Home, ClipboardList, Users, Package, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/admin" },
  { icon: ClipboardList, label: "Orders", path: "/admin/orders" },
  { icon: Package, label: "Services", path: "/admin/services" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-sm">K</span>
          </div>
          <span className="font-extrabold text-xl text-foreground tracking-tight">Admin Klumpang</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Keluar ke User App
        </Link>
      </div>
    </div>
  );
}
