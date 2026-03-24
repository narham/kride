import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Map, CreditCard, Bell, Cloud, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pengaturan Disimpan",
      description: "Seluruh konfigurasi API Key telah berhasil diperbarui.",
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Pengaturan Sistem</h1>
          <p className="text-muted-foreground font-medium">Konfigurasi integrasi pihak ketiga dan parameter sistem Klumpang GO.</p>
        </div>

        <form onSubmit={handleSave}>
          <Tabs defaultValue="maps" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mb-8">
              <TabsTrigger value="maps" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Maps
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notif
              </TabsTrigger>
              <TabsTrigger value="others" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Cloud
              </TabsTrigger>
            </TabsList>

            {/* Maps Configuration */}
            <TabsContent value="maps">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Peta (OpenStreetMap)
                  </CardTitle>
                  <CardDescription>Aplikasi saat ini menggunakan OpenStreetMap (OSM) yang bersifat open-source.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-2xl bg-muted/50 border border-dashed border-muted-foreground/30">
                    <p className="text-sm font-bold text-muted-foreground italic">
                      Integrasi OpenStreetMap aktif dengan Nominatim Search. Tidak diperlukan API Key.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tile-server">Tile Server URL (Opsional)</Label>
                    <Input id="tile-server" placeholder="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Midtrans Configuration */}
            <TabsContent value="payment">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Midtrans Payment Gateway
                  </CardTitle>
                  <CardDescription>Konfigurasi untuk memproses pembayaran K-Pay dan metode lainnya.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="midtrans-client">Client Key</Label>
                      <Input id="midtrans-client" placeholder="SB-Mid-client-..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="midtrans-server">Server Key</Label>
                      <Input id="midtrans-server" type="password" placeholder="SB-Mid-server-..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="midtrans-env">Environment</Label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="sandbox">Sandbox (Testing)</option>
                      <option value="production">Production (Live)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Firebase Configuration */}
            <TabsContent value="notifications">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Firebase Cloud Messaging
                  </CardTitle>
                  <CardDescription>Konfigurasi untuk push notifications ke user dan driver.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fcm-server-key">Server Key (Legacy)</Label>
                    <Input id="fcm-server-key" type="password" placeholder="AAAA..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fcm-config">Firebase Config JSON</Label>
                    <textarea 
                      id="fcm-config" 
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder='{ "apiKey": "...", "authDomain": "..." }'
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other Configurations */}
            <TabsContent value="others">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-primary" />
                    Layanan Cloud & Storage
                  </CardTitle>
                  <CardDescription>Optimasi gambar dan penyimpanan data statis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cloudinary-url">Cloudinary URL</Label>
                    <Input id="cloudinary-url" placeholder="cloudinary://..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s3-bucket">AWS S3 / R2 Bucket Name</Label>
                    <Input id="s3-bucket" placeholder="klumpang-go-assets" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" className="px-8 font-black uppercase tracking-widest gap-2">
              <Save className="h-5 w-5" />
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
