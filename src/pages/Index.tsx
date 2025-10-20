import { useState, useRef } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { IDCardForm } from "@/components/IDCardForm";
import { IDCardPreview } from "@/components/IDCardPreview";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import type { FormData } from "@/types/idCard";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<"student" | "employee" | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.download = `id-card-${(formData as any).idNumber || "preview"}.png`;
      link.href = canvas.toDataURL();
      link.click();
      toast.success("ID Card downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download ID card");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ID Card Generator</h1>
              <p className="text-xs text-muted-foreground">Professional credentials in minutes</p>
            </div>
          </div>
          {selectedRole && (
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download Card
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <RoleSelector selectedRole={selectedRole} onRoleSelect={setSelectedRole} />

          {selectedRole && (
            <div className="grid lg:grid-cols-2 gap-8">
              <IDCardForm
                role={selectedRole}
                formData={formData}
                onFormChange={handleFormChange}
                onPhotoUpload={handlePhotoUpload}
                onLogoUpload={handleLogoUpload}
                photoPreview={photoPreview}
                logoPreview={logoPreview}
              />
              <IDCardPreview
                role={selectedRole}
                formData={formData}
                photoPreview={photoPreview}
                logoPreview={logoPreview}
                cardRef={cardRef}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
