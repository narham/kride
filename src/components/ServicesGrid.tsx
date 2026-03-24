import { Car, Bike, UtensilsCrossed, Send, ShoppingCart, ShoppingBag, Play, Pill, Star, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  { icon: Bike, label: "K-Ride", color: "bg-primary", path: "/k-ride" },
  { icon: Car, label: "K-Car", color: "bg-primary", path: "/k-car" },
  { icon: UtensilsCrossed, label: "K-Food", color: "bg-destructive", path: "/k-food" },
  { icon: Send, label: "K-Send", color: "bg-primary", path: "/k-send" },
  { icon: ShoppingCart, label: "K-Mart", color: "bg-destructive", path: "/k-mart" },
  { icon: ShoppingBag, label: "K-Shop", color: "bg-accent", path: "/k-shop" },
  { icon: Play, label: "K-Play", color: "bg-accent", path: "/k-play" },
  { icon: Pill, label: "K-Med", color: "bg-primary", path: "/k-med" },
  { icon: Star, label: "K-Club", color: "bg-accent", path: "/k-club" },
  { icon: Truck, label: "K-Box", color: "bg-primary", path: "/k-box" },
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-4 mt-6" aria-label="Layanan Klumpang">
      <div className="grid grid-cols-4 gap-y-5 gap-x-2 sm:grid-cols-5">
        {services.map((service) => (
          <button
            key={service.label}
            onClick={() => navigate(service.path)}
            className="flex flex-col items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1 transition-all active:scale-90"
            aria-label={service.label}
          >
            <div className={`h-12 w-12 rounded-2xl ${service.color} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300`}>
              <service.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-[11px] font-bold text-foreground tracking-tight">{service.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
