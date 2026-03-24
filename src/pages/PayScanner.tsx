import ServiceLayout from "@/components/ServiceLayout";
import { QrCode, Image, Zap, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PayScanner = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10">
          <X className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest">Pindai QR</h1>
        <button className="p-2 rounded-full bg-white/10">
          <Zap className="h-6 w-6" />
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 pt-12">
        <div className="relative w-full aspect-square max-w-[280px]">
          {/* Scanner Frame */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
          
          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-4 right-4 h-1 bg-primary/50 blur-sm animate-[scan_2s_infinite]" />
          
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <QrCode className="w-32 h-32" />
          </div>
        </div>

        <p className="mt-12 text-center text-sm font-medium text-white/70 px-8">
          Arahkan kamera ke kode QR merchant atau driver untuk membayar
        </p>

        <div className="mt-auto pb-20 w-full max-w-xs">
          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm">
            <Image className="h-5 w-5" />
            Upload dari Galeri
          </button>
        </div>
      </main>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PayScanner;
