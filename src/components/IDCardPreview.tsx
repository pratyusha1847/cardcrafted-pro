import { QRCodeSVG } from "qrcode.react";
import type { FormData } from "@/types/idCard";

interface IDCardPreviewProps {
  role: "student" | "employee";
  formData: FormData;
  photoPreview: string | null;
  logoPreview: string | null;
  cardRef: React.RefObject<HTMLDivElement>;
}

export const IDCardPreview = ({
  role,
  formData,
  photoPreview,
  logoPreview,
  cardRef,
}: IDCardPreviewProps) => {
  const qrData = JSON.stringify({
    name: formData.name || "",
    id: formData.idNumber || "",
    role: role,
    institute: formData.instituteName || "",
  });

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
      
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="w-[350px] h-[550px] bg-white rounded-2xl shadow-[var(--shadow-card-hover)] overflow-hidden relative"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            {logoPreview && (
              <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg">
                <img src={logoPreview} alt="Logo" className="h-12 object-contain" />
              </div>
            )}
            <div className="absolute bottom-3 left-4 text-white">
              <p className="text-xs font-medium opacity-90">
                {role === "student" ? "STUDENT ID CARD" : "EMPLOYEE ID CARD"}
              </p>
              <h3 className="text-sm font-bold mt-0.5">
                {formData.instituteName || "Institute/Company Name"}
              </h3>
            </div>
          </div>

          {/* Photo Section */}
          <div className="flex justify-center -mt-14">
            <div className="w-28 h-32 bg-gray-200 rounded-xl shadow-lg border-4 border-white overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="ID" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Photo
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="px-6 mt-4 space-y-3">
            <div className="text-center border-b border-gray-200 pb-3">
              <h2 className="text-lg font-bold text-gray-800">
                {formData.name || "Full Name"}
              </h2>
              <p className="text-sm text-blue-600 font-semibold mt-1">
                {formData.idNumber || (role === "student" ? "STU-XXXX" : "EMP-XXXX")}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              {role === "student" ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Course:</span>
                    <span className="text-gray-800">{formData.course || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Department:</span>
                    <span className="text-gray-800">{formData.department || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Year:</span>
                    <span className="text-gray-800">{formData.year || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Blood Group:</span>
                    <span className="text-red-600 font-semibold">{formData.bloodGroup || "---"}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Designation:</span>
                    <span className="text-gray-800">{formData.designation || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Department:</span>
                    <span className="text-gray-800">{formData.department || "---"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Joined:</span>
                    <span className="text-gray-800">
                      {formData.joiningDate
                        ? new Date(formData.joiningDate).toLocaleDateString()
                        : "---"}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* QR Code */}
            <div className="flex justify-center pt-4 border-t border-gray-200">
              <div className="bg-white p-2 rounded-lg">
                <QRCodeSVG value={qrData} size={80} level="M" />
              </div>
            </div>

            <p className="text-[10px] text-center text-gray-500 pt-2">
              Scan for verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
