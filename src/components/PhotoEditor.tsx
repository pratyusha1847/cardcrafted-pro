import { Label } from "@/components/ui/label";
import { PhotoShape } from "@/types/templates";
import { Circle, RectangleHorizontal, Square } from "lucide-react";

interface PhotoEditorProps {
  shape: PhotoShape;
  onShapeChange: (shape: PhotoShape) => void;
}

export const PhotoEditor = ({ shape, onShapeChange }: PhotoEditorProps) => {
  const shapes: { value: PhotoShape; label: string; icon: React.ReactNode }[] = [
    { value: "circle", label: "Circle", icon: <Circle className="w-4 h-4" /> },
    { value: "rounded", label: "Rounded", icon: <RectangleHorizontal className="w-4 h-4" /> },
    { value: "square", label: "Square", icon: <Square className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-2">
      <Label>Photo Shape</Label>
      <div className="grid grid-cols-3 gap-2">
        {shapes.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onShapeChange(option.value)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border-2 transition-all ${
              shape === option.value
                ? "border-primary bg-primary/5 text-primary"
                : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.icon}
            <span className="text-xs font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
