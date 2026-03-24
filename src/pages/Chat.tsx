import { MessageCircle, ChevronRight, User } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const chats = [
  { id: "CHAT-1", name: "Agus (K-Ride)", lastMessage: "Sudah di lokasi ya kak", time: "18:32", unread: 1 },
  { id: "CHAT-2", name: "Budi (K-Food)", lastMessage: "Pesanan sedang diproses", time: "12:46", unread: 0 },
  { id: "CHAT-3", name: "Customer Service", lastMessage: "Ada yang bisa kami bantu?", time: "Kemarin", unread: 0 },
];

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">
        <h1 className="text-xl font-black tracking-tight mb-6">Chat</h1>

        <div className="space-y-2">
          {chats.map((chat) => (
            <button 
              key={chat.id} 
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full p-4 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border/50 overflow-hidden">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="font-black text-base tracking-tight truncate pr-2">{chat.name}</p>
                    <span className="text-[10px] font-extrabold text-muted-foreground uppercase">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={cn(
                      "text-sm truncate",
                      chat.unread > 0 ? "font-bold text-foreground" : "font-medium text-muted-foreground"
                    )}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="h-5 w-5 rounded-full bg-primary text-[10px] font-black text-white flex items-center justify-center shrink-0 ml-2">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:translate-x-1 transition-transform ml-3" />
            </button>
          ))}
        </div>

        {chats.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Belum ada chat</h1>
            <p className="text-sm text-muted-foreground mt-1">Chat dengan driver atau merchant akan muncul di sini</p>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Chat;
