import { cardTemplates } from "@/lib/templates";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelector = ({ selectedTemplateId, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Card Template</h3>
      <div className="grid grid-cols-3 gap-3">
        {cardTemplates.map((template) => (
          <Card
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`p-3 cursor-pointer transition-all border-2 hover:shadow-md relative ${
              selectedTemplateId === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
          >
            {selectedTemplateId === template.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div 
              className="h-16 rounded-lg mb-2"
              style={{
                background: `linear-gradient(135deg, ${template.gradientStart}, ${template.gradientEnd})`
              }}
            />
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{template.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{template.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
