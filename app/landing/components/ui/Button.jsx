import { Download, Info } from "lucide-react";

export default function Button({ text, onClick, type = "button", className = "", href, icon }) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#3eb5f1] to-[#e466c8] hover:opacity-90 transition";

  const IconComponent = icon === "download" ? Download : icon === "info" ? Info : null;

  const content = (
    <>
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {text}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`}>
      {content}
    </button>
  );
}