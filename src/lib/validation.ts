import { FormData } from "@/types/idCard";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = (
  formData: FormData,
  role: "student" | "employee"
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Common validations
  if (!formData.name?.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  } else if (formData.name.length > 100) {
    errors.push({ field: "name", message: "Name must be less than 100 characters" });
  }

  if (!formData.idNumber?.trim()) {
    errors.push({ field: "idNumber", message: `${role === "student" ? "Roll Number" : "Employee ID"} is required` });
  } else if (!/^[A-Z0-9-]+$/i.test(formData.idNumber)) {
    errors.push({ field: "idNumber", message: "ID must contain only letters, numbers, and hyphens" });
  }

  if (!formData.instituteName?.trim()) {
    errors.push({ field: "instituteName", message: `${role === "student" ? "Institute" : "Company"} name is required` });
  }

  if (!formData.department?.trim()) {
    errors.push({ field: "department", message: "Department is required" });
  }

  // Expiry date validation
  if (formData.expiryDate) {
    const expiry = new Date(formData.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (expiry < today) {
      errors.push({ field: "expiryDate", message: "Expiry date must be in the future" });
    }
  }

  // Role-specific validations
  if (role === "student") {
    if (formData.course && formData.course.length > 100) {
      errors.push({ field: "course", message: "Course name is too long" });
    }
    if (formData.year && formData.year.length > 50) {
      errors.push({ field: "year", message: "Year is too long" });
    }
    if (formData.bloodGroup && !/^(A|B|AB|O)[+-]?$/i.test(formData.bloodGroup)) {
      errors.push({ field: "bloodGroup", message: "Invalid blood group format (e.g., O+, A-, AB+)" });
    }
  } else {
    if (!formData.designation?.trim()) {
      errors.push({ field: "designation", message: "Designation is required" });
    }
    if (formData.joiningDate) {
      const joining = new Date(formData.joiningDate);
      const today = new Date();
      if (joining > today) {
        errors.push({ field: "joiningDate", message: "Joining date cannot be in the future" });
      }
    }
  }

  return errors;
};

export const getFieldError = (errors: ValidationError[], field: string): string | undefined => {
  return errors.find((e) => e.field === field)?.message;
};
