import ServiceLayout from "@/components/ServiceLayout";
import { Bell, Tag, Info, AlertTriangle } from "lucide-react";

const Notifications = () => {
  const notifications = [
    { id: 1, icon: Tag, label: "Promo GoFood!", text: "Diskon 60% khusus untuk makan siangmu hari ini. Cek sekarang!", time: "2 jam yang lalu", color: "bg-destructive/10 text-destructive" },
    { id: 2, icon: Info, label: "Update Keamanan", text: "Jangan berikan kode OTP Anda kepada siapapun, termasuk pihak Klumpang GO.", time: "1 hari yang lalu", color: "bg-blue-100 text-blue-600" },
    { id: 3, icon: AlertTriangle, label: "Perjalanan Terakhir", text: "Terima kasih telah menggunakan GoRide! Beri bintang pada pengemudi Anda.", time: "2 hari yang lalu", color: "bg-primary/10 text-primary" },
  ];

  return (
    <ServiceLayout title="Notifikasi">
      <div className="flex flex-col gap-4">
        {notifications.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl bg-card border border-border/50 hover:bg-muted/30 transition-all shadow-sm group active:scale-[0.98]">
            <div className="flex gap-4">
              <div className={`p-3 rounded-2xl h-fit ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="font-extrabold text-base tracking-tight">{item.label}</h3>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.time}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ServiceLayout>
  );
};

export default Notifications;
