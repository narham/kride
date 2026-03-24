import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Promo from "./pages/Promo.tsx";
import Orders from "./pages/Orders.tsx";
import Chat from "./pages/Chat.tsx";
import Login from "./pages/Login.tsx";
import TopUp from "./pages/TopUp.tsx";
import PayScanner from "./pages/PayScanner.tsx";
import NotFound from "./pages/NotFound.tsx";
import GoRide from "./pages/GoRide.tsx";
import GoFood from "./pages/GoFood.tsx";
import GenericService from "./pages/GenericService.tsx";
import GoPayService from "./pages/GoPayService.tsx";
import Profile from "./pages/Profile.tsx";
import Notifications from "./pages/Notifications.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import DetailPlaceholder from "./pages/DetailPlaceholder.tsx";
import DriverHome from "./pages/driver/DriverHome.tsx";
import DriverEarnings from "./pages/driver/DriverEarnings.tsx";
import DriverPerformance from "./pages/driver/DriverPerformance.tsx";
import DriverProfile from "./pages/driver/DriverProfile.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<DetailPlaceholder />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<DetailPlaceholder />} />
          
          {/* Service Routes */}
          <Route path="/k-ride" element={<GoRide />} />
          <Route path="/k-food" element={<GoFood />} />
          <Route path="/k-car" element={<GenericService />} />
          <Route path="/k-send" element={<GenericService />} />
          <Route path="/k-mart" element={<GenericService />} />
          <Route path="/k-shop" element={<GenericService />} />
          <Route path="/k-play" element={<GenericService />} />
          <Route path="/k-med" element={<GenericService />} />
          <Route path="/k-club" element={<GenericService />} />
          <Route path="/k-box" element={<GenericService />} />
          
          {/* K-Pay Routes */}
          <Route path="/k-pay-pay" element={<PayScanner />} />
          <Route path="/k-pay-topup" element={<TopUp />} />
          <Route path="/k-pay-explore" element={<GoPayService />} />
          <Route path="/k-pay-more" element={<GoPayService />} />
          <Route path="/k-pay-history" element={<GoPayService />} />
          
          {/* Header Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Driver Routes */}
          <Route path="/driver" element={<DriverHome />} />
          <Route path="/driver/earnings" element={<DriverEarnings />} />
          <Route path="/driver/performance" element={<DriverPerformance />} />
          <Route path="/driver/profile" element={<DriverProfile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
