import { Bell, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-extrabold text-sm">K</span>
          </div>
          <span className="font-extrabold text-lg text-foreground tracking-tight">Klumpang GO</span>
        </div>

        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari layanan, makanan, & tujuan"
            aria-label="Cari layanan, makanan, dan tujuan"
            className="w-full rounded-full bg-muted pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </form>

        <button 
          onClick={() => navigate("/notifications")}
          className="relative p-2 rounded-full hover:bg-muted transition-colors active:scale-95"
          aria-label="Notifikasi"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
        </button>

        <button 
          onClick={() => navigate("/profile")}
          className="p-1 rounded-full border-2 border-primary hover:bg-primary/10 transition-colors active:scale-95"
          aria-label="Profil Pengguna"
        >
          <User className="h-5 w-5 text-primary" />
        </button>
      </div>
    </header>
  );
};

export default Header;
