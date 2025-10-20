import { useState, useRef } from "react";
import { RoleSelector } from "@/components/RoleSelector";
import { IDCardForm } from "@/components/IDCardForm";
import { IDCardPreview } from "@/components/IDCardPreview";
import { TemplateSelector } from "@/components/TemplateSelector";
import { StyleCustomizer } from "@/components/StyleCustomizer";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, FlipHorizontal2 } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import type { FormData } from "@/types/idCard";
import type { PhotoShape } from "@/types/templates";
import { cardTemplates } from "@/lib/templates";
import { validateForm, ValidationError } from "@/lib/validation";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<"student" | "employee" | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(cardTemplates[0].id);
  const [photoShape, setPhotoShape] = useState<PhotoShape>("rounded");
  const [customPrimaryColor, setCustomPrimaryColor] = useState(cardTemplates[0].gradientStart);
  const [customSecondaryColor, setCustomSecondaryColor] = useState(cardTemplates[0].gradientEnd);
  const [showBack, setShowBack] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Clear validation errors for this field
    if (validationErrors.length > 0) {
      setValidationErrors(validationErrors.filter(e => e.field !== field));
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = cardTemplates.find(t => t.id === templateId);
    if (template) {
      setCustomPrimaryColor(template.gradientStart);
      setCustomSecondaryColor(template.gradientEnd);
    }
  };

  const validateAndShowErrors = (): boolean => {
    if (!selectedRole) return false;
    const errors = validateForm(formData, selectedRole);
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      toast.error(`Please fix ${errors.length} validation error${errors.length > 1 ? 's' : ''}`);
      return false;
    }
    return true;
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
    
    if (!validateAndShowErrors()) {
      return;
    }
    
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowBack(!showBack)} 
                className="gap-2"
              >
                <FlipHorizontal2 className="w-4 h-4" />
                {showBack ? "Show Front" : "Show Back"}
              </Button>
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Download Card
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <RoleSelector selectedRole={selectedRole} onRoleSelect={setSelectedRole} />

          {selectedRole && (
            <div className="space-y-8">
              {/* Template & Style Selection */}
              <div className="grid lg:grid-cols-2 gap-6">
                <TemplateSelector
                  selectedTemplateId={selectedTemplateId}
                  onTemplateSelect={handleTemplateChange}
                />
                <StyleCustomizer
                  primaryColor={customPrimaryColor}
                  secondaryColor={customSecondaryColor}
                  onPrimaryColorChange={setCustomPrimaryColor}
                  onSecondaryColorChange={setCustomSecondaryColor}
                />
              </div>

              {/* Form & Preview */}
              <div className="grid lg:grid-cols-2 gap-8">
                <IDCardForm
                  role={selectedRole}
                  formData={formData}
                  onFormChange={handleFormChange}
                  onPhotoUpload={handlePhotoUpload}
                  onLogoUpload={handleLogoUpload}
                  photoPreview={photoPreview}
                  logoPreview={logoPreview}
                  photoShape={photoShape}
                  onPhotoShapeChange={setPhotoShape}
                  validationErrors={validationErrors}
                />
                <IDCardPreview
                  role={selectedRole}
                  formData={formData}
                  photoPreview={photoPreview}
                  logoPreview={logoPreview}
                  cardRef={cardRef}
                  templateId={selectedTemplateId}
                  photoShape={photoShape}
                  customPrimaryColor={customPrimaryColor}
                  customSecondaryColor={customSecondaryColor}
                  showBack={showBack}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
