import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface ServiceLayoutProps {
  title: string;
  children: ReactNode;
}

const ServiceLayout = ({ title, children }: ServiceLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-50 bg-card px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1 rounded-full hover:bg-muted transition-colors active:scale-90"
            aria-label="Kembali"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold tracking-tight">{title}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-lg p-6">
        {children}
      </main>
    </div>
  );
};

export default ServiceLayout;
