import { QrCode, ArrowUpCircle, Compass, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GoPayCard = () => {
  const navigate = useNavigate();
  
  const actions = [
    { icon: QrCode, label: "Pay", color: "text-gopay-foreground", path: "/k-pay-pay" },
    { icon: ArrowUpCircle, label: "Top Up", color: "text-gopay-foreground", path: "/k-pay-topup" },
    { icon: Compass, label: "Explore", color: "text-gopay-foreground", path: "/k-pay-explore" },
    { icon: Plus, label: "More", color: "text-gopay-foreground", path: "/k-pay-more" },
  ];

  return (
    <section className="mx-4 -mt-1 rounded-2xl bg-gopay p-4 shadow-lg" aria-label="Informasi K-Pay">
      <div className="flex items-center justify-between mb-4">
        <div className="cursor-pointer group" onClick={() => navigate("/k-pay-history")}>
          <p className="text-xs font-medium text-gopay-foreground/70 uppercase tracking-wider group-hover:text-white transition-colors">K-Pay</p>
          <p className="text-xl font-bold text-gopay-foreground group-hover:scale-105 transition-transform origin-left">Rp 1.250.000</p>
        </div>
        <button 
          onClick={() => navigate("/k-pay-topup")}
          className="rounded-full bg-gopay-foreground/20 px-3 py-1 text-xs font-bold text-gopay-foreground hover:bg-gopay-foreground/30 transition-colors active:scale-95"
          aria-label="Isi saldo K-Pay"
        >
          Top Up
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <button 
            key={action.label} 
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-1.5 rounded-xl py-2 hover:bg-gopay-foreground/10 transition-all active:scale-95"
            aria-label={action.label}
          >
            <div className="h-9 w-9 rounded-full bg-gopay-foreground/20 flex items-center justify-center shadow-sm">
              <action.icon className={`h-4.5 w-4.5 ${action.color}`} />
            </div>
            <span className="text-[10px] font-bold text-gopay-foreground tracking-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default GoPayCard;
