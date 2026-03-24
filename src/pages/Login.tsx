import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Smartphone } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-muted transition-all active:scale-90"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      </header>

      <main className="flex-1 flex flex-col px-8 pt-8 max-w-lg mx-auto w-full">
        <div className="mb-12">
          <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-xl shadow-primary/20">
            <span className="text-white font-black text-3xl italic">K</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Selamat datang!</h1>
          <p className="text-muted-foreground font-medium">Masukkan nomor HP-mu untuk masuk ke Klumpang GO.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nomor HP</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-sm border-r pr-3">+62</span>
              <Input 
                id="phone"
                type="tel"
                placeholder="812 3456 7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-16 py-7 rounded-2xl bg-muted border-none text-lg font-bold focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full py-7 rounded-2xl bg-primary text-white font-black text-base uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
            >
              Lanjut
            </Button>
            <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-4">
              Dengan masuk, kamu menyetujui <span className="text-primary font-bold">Ketentuan Layanan</span> dan <span className="text-primary font-bold">Kebijakan Privasi</span> Klumpang GO.
            </p>
          </div>
        </form>

        <div className="mt-auto pb-12">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative bg-background px-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Atau masuk dengan</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-border hover:bg-muted transition-all active:scale-95 font-bold text-sm">
              <img src="https://www.google.com/favicon.ico" className="h-4 w-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-border hover:bg-muted transition-all active:scale-95 font-bold text-sm">
              <Smartphone className="h-4 w-4 text-primary" />
              E-Mail
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
