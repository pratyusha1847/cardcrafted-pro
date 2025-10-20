import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import type { FormData } from "@/types/idCard";

interface IDCardFormProps {
  role: "student" | "employee";
  formData: FormData;
  onFormChange: (field: string, value: string) => void;
  onPhotoUpload: (file: File) => void;
  onLogoUpload: (file: File) => void;
  photoPreview: string | null;
  logoPreview: string | null;
}

export const IDCardForm = ({
  role,
  formData,
  onFormChange,
  onPhotoUpload,
  onLogoUpload,
  photoPreview,
  logoPreview,
}: IDCardFormProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "photo" | "logo") => {
    const file = e.target.files?.[0];
    if (file) {
      type === "photo" ? onPhotoUpload(file) : onLogoUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">
        {role === "student" ? "Student Details" : "Employee Details"}
      </h2>

      <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-card/50 shadow-[var(--shadow-card)]">
        {/* Photo Upload */}
        <div className="space-y-2">
          <Label htmlFor="photo">Photo</Label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="photo"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30"
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="h-32 w-24 object-cover rounded" />
              ) : (
                <div className="text-center">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload Photo</p>
                </div>
              )}
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "photo")}
              className="hidden"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label htmlFor="logo">Institute/Company Logo</Label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="logo"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-16 object-contain" />
              ) : (
                <div className="text-center">
                  <Upload className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Upload Logo</p>
                </div>
              )}
            </label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "logo")}
              className="hidden"
            />
          </div>
        </div>

        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => onFormChange("name", e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber">{role === "student" ? "Roll Number" : "Employee ID"}</Label>
            <Input
              id="idNumber"
              value={formData.idNumber || ""}
              onChange={(e) => onFormChange("idNumber", e.target.value)}
              placeholder={role === "student" ? "STU2025-001" : "EMP2025-001"}
            />
          </div>
        </div>

        {role === "student" ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  value={formData.course || ""}
                  onChange={(e) => onFormChange("course", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department || ""}
                  onChange={(e) => onFormChange("department", e.target.value)}
                  placeholder="Engineering"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  value={formData.year || ""}
                  onChange={(e) => onFormChange("year", e.target.value)}
                  placeholder="2nd Year"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={formData.bloodGroup || ""}
                  onChange={(e) => onFormChange("bloodGroup", e.target.value)}
                  placeholder="O+"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation || ""}
                  onChange={(e) => onFormChange("designation", e.target.value)}
                  placeholder="Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department || ""}
                  onChange={(e) => onFormChange("department", e.target.value)}
                  placeholder="IT Department"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input
                id="joiningDate"
                type="date"
                value={formData.joiningDate || ""}
                onChange={(e) => onFormChange("joiningDate", e.target.value)}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="instituteName">
            {role === "student" ? "Institute Name" : "Company Name"}
          </Label>
          <Input
            id="instituteName"
            value={formData.instituteName || ""}
            onChange={(e) => onFormChange("instituteName", e.target.value)}
            placeholder={role === "student" ? "University of Technology" : "Tech Solutions Inc."}
          />
        </div>
      </Card>
    </div>
  );
};
