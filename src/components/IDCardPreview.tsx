import { QRCodeSVG } from "qrcode.react";
import type { FormData } from "@/types/idCard";
import type { PhotoShape } from "@/types/templates";
import { getTemplateById } from "@/lib/templates";

interface IDCardPreviewProps {
  role: "student" | "employee";
  formData: FormData;
  photoPreview: string | null;
  logoPreview: string | null;
  cardRef: React.RefObject<HTMLDivElement>;
  templateId: string;
  photoShape: PhotoShape;
  customPrimaryColor: string;
  customSecondaryColor: string;
  showBack: boolean;
}

export const IDCardPreview = ({
  role,
  formData,
  photoPreview,
  logoPreview,
  cardRef,
  templateId,
  photoShape,
  customPrimaryColor,
  customSecondaryColor,
  showBack,
}: IDCardPreviewProps) => {
  const template = getTemplateById(templateId);
  
  const qrData = JSON.stringify({
    name: formData.name || "",
    id: formData.idNumber || "",
    role: role,
    institute: formData.instituteName || "",
    expiry: formData.expiryDate || "",
  });

  const getPhotoClasses = () => {
    const base = "w-28 h-32 bg-gray-200 shadow-lg border-4 border-white overflow-hidden";
    switch (photoShape) {
      case "circle":
        return `${base} rounded-full w-32 h-32`;
      case "square":
        return `${base} rounded-none`;
      case "rounded":
      default:
        return `${base} rounded-xl`;
    }
  };

  const cardBackground = template.colors.background;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
      
      <div className="flex justify-center perspective-1000">
        <div
          ref={cardRef}
          className="w-[350px] h-[550px] rounded-2xl shadow-[var(--shadow-card-hover)] overflow-hidden relative transition-transform duration-700 preserve-3d"
          style={{ 
            fontFamily: template.fontFamily,
            backgroundColor: cardBackground,
            transform: showBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT SIDE */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{ transform: 'rotateY(0deg)' }}
          >
            {/* Header with gradient */}
            <div 
              className="h-32 relative"
              style={{
                background: `linear-gradient(135deg, ${customPrimaryColor}, ${customSecondaryColor})`
              }}
            >
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
              <div className={getPhotoClasses()}>
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
              <div className="text-center border-b pb-3" style={{ borderColor: `${customPrimaryColor}20` }}>
                <h2 className="text-lg font-bold" style={{ color: template.colors.text }}>
                  {formData.name || "Full Name"}
                </h2>
                <p className="text-sm font-semibold mt-1" style={{ color: customPrimaryColor }}>
                  {formData.idNumber || (role === "student" ? "STU-XXXX" : "EMP-XXXX")}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                {role === "student" ? (
                  <>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Course:</span>
                      <span style={{ color: template.colors.text }}>{formData.course || "---"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Department:</span>
                      <span style={{ color: template.colors.text }}>{formData.department || "---"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Year:</span>
                      <span style={{ color: template.colors.text }}>{formData.year || "---"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Blood Group:</span>
                      <span className="font-semibold" style={{ color: template.colors.accent }}>{formData.bloodGroup || "---"}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Designation:</span>
                      <span style={{ color: template.colors.text }}>{formData.designation || "---"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Department:</span>
                      <span style={{ color: template.colors.text }}>{formData.department || "---"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: template.colors.textLight }} className="font-medium">Joined:</span>
                      <span style={{ color: template.colors.text }}>
                        {formData.joiningDate
                          ? new Date(formData.joiningDate).toLocaleDateString()
                          : "---"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* QR Code */}
              <div className="flex justify-center pt-4 border-t" style={{ borderColor: `${customPrimaryColor}20` }}>
                <div className="bg-white p-2 rounded-lg">
                  <QRCodeSVG value={qrData} size={80} level="M" />
                </div>
              </div>

              <p className="text-[10px] text-center pt-2" style={{ color: template.colors.textLight }}>
                Scan for verification
              </p>
              
              {formData.expiryDate && (
                <p className="text-[10px] text-center font-medium" style={{ color: template.colors.textLight }}>
                  Valid until: {new Date(formData.expiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* BACK SIDE */}
          <div 
            className="absolute inset-0 backface-hidden p-6"
            style={{ 
              transform: 'rotateY(180deg)',
              backgroundColor: cardBackground,
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b" style={{ borderColor: `${customPrimaryColor}20` }}>
                <h3 className="text-lg font-bold" style={{ color: customPrimaryColor }}>Important Information</h3>
              </div>

              {/* Additional Info */}
              <div className="space-y-4 flex-1">
                {formData.address && (
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: template.colors.textLight }}>Address:</p>
                    <p className="text-sm" style={{ color: template.colors.text }}>{formData.address}</p>
                  </div>
                )}

                {formData.emergencyContact && (
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: template.colors.textLight }}>Emergency Contact:</p>
                    <p className="text-sm" style={{ color: template.colors.text }}>{formData.emergencyContact}</p>
                  </div>
                )}

                <div className="pt-4 border-t" style={{ borderColor: `${customPrimaryColor}20` }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: template.colors.textLight }}>Terms & Conditions:</p>
                  <ul className="text-[10px] space-y-1" style={{ color: template.colors.textLight }}>
                    <li>• This card is non-transferable</li>
                    <li>• Report immediately if lost or stolen</li>
                    <li>• Must be worn visibly at all times</li>
                    <li>• Misuse will result in disciplinary action</li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t" style={{ borderColor: `${customPrimaryColor}20` }}>
                <p className="text-xs font-semibold" style={{ color: template.colors.text }}>
                  {formData.instituteName || "Organization Name"}
                </p>
                <p className="text-[10px] mt-1" style={{ color: template.colors.textLight }}>
                  Authorized Signature: _______________
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
