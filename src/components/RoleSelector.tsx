import { GraduationCap, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RoleSelectorProps {
  selectedRole: "student" | "employee" | null;
  onRoleSelect: (role: "student" | "employee") => void;
}

export const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Select ID Type</h2>
      <div className="grid grid-cols-2 gap-4">
        <Card
          onClick={() => onRoleSelect("student")}
          className={`p-6 cursor-pointer transition-all border-2 hover:shadow-[var(--shadow-card-hover)] ${
            selectedRole === "student"
              ? "border-primary bg-gradient-to-br from-primary/5 to-accent/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className={`p-3 rounded-xl ${
              selectedRole === "student" 
                ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            }`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Student</h3>
              <p className="text-xs text-muted-foreground mt-1">Academic ID Card</p>
            </div>
          </div>
        </Card>

        <Card
          onClick={() => onRoleSelect("employee")}
          className={`p-6 cursor-pointer transition-all border-2 hover:shadow-[var(--shadow-card-hover)] ${
            selectedRole === "employee"
              ? "border-primary bg-gradient-to-br from-primary/5 to-accent/5"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className={`p-3 rounded-xl ${
              selectedRole === "employee" 
                ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            }`}>
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Employee</h3>
              <p className="text-xs text-muted-foreground mt-1">Corporate ID Card</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
