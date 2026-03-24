import { Home, Tag, ClipboardList, MessageCircle } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Tag, label: "Promo", path: "/promo" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
  { icon: MessageCircle, label: "Chat", path: "/chat" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)] pb-safe" aria-label="Navigasi Utama">
      <div className="mx-auto max-w-lg flex items-center justify-around py-2.5 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-300 active:scale-90 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`relative ${isActive ? "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary" : ""}`}>
                <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[11px] tracking-tight ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
