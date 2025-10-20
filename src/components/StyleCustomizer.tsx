import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Palette, Type } from "lucide-react";

interface StyleCustomizerProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

export const StyleCustomizer = ({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: StyleCustomizerProps) => {
  return (
    <Card className="p-4 space-y-4 bg-gradient-to-br from-card to-card/50">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Custom Colors</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex gap-2">
            <Input
              id="primaryColor"
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="h-10 w-14 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="flex-1 font-mono text-xs"
              placeholder="#2563eb"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <div className="flex gap-2">
            <Input
              id="secondaryColor"
              type="color"
              value={secondaryColor}
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              className="h-10 w-14 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={secondaryColor}
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              className="flex-1 font-mono text-xs"
              placeholder="#7c3aed"
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Customize the gradient colors for your card header
      </p>
    </Card>
  );
};
