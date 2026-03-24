import { ReactNode, useState } from "react";
import DriverBottomNav from "./DriverBottomNav";
import { Power, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverLayoutProps {
  children: ReactNode;
}

const DriverLayout = ({ children }: DriverLayoutProps) => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-card px-4 py-3 shadow-sm border-b border-border/50">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-black text-lg italic">K</span>
             </div>
             <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-tight">Klumpang Driver</p>
                <p className="text-sm font-black tracking-tight leading-tight">Agus Santoso</p>
             </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-sm",
                isOnline ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"
              )}
            >
              <Power className={cn("h-4 w-4", isOnline ? "animate-pulse" : "")} />
              {isOnline ? "Online" : "Offline"}
            </button>
            <button className="p-2 rounded-full hover:bg-muted relative transition-colors">
               <Bell className="h-5 w-5 text-foreground" />
               <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg">
        {children}
      </main>

      <DriverBottomNav />
    </div>
  );
};

export default DriverLayout;
