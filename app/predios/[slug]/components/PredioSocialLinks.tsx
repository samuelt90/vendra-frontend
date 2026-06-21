import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";

type Props = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string;
};

type SocialLink = {
  label: string;
  href?: string;
  icon: IconType;
  className: string;
};

export default function PredioSocialLinks({
  instagram,
  facebook,
  tiktok,
  whatsapp,
}: Props) {
  const links: SocialLink[] = [
    {
      label: "Instagram",
      href: instagram,
      icon: FaInstagram,
      className: "bg-pink-600 hover:bg-pink-700",
    },
    {
      label: "Facebook",
      href: facebook,
      icon: FaFacebookF,
      className: "bg-blue-600 hover:bg-blue-700",
    },
    {
      label: "TikTok",
      href: tiktok,
      icon: FaTiktok,
      className: "bg-slate-950 hover:bg-black",
    },
    {
      label: "WhatsApp",
      href: whatsapp,
      icon: FaWhatsapp,
      className: "bg-green-600 hover:bg-green-700",
    },
  ];

  const availableLinks = links.filter((link) => Boolean(link.href));

  if (!availableLinks.length) return null;

  return (
    <div className="mt-5">
      <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
        Redes sociales y contacto
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {availableLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${link.label}`}
              title={link.label}
              className={`grid h-12 w-12 place-items-center rounded-2xl text-white shadow-md transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg active:translate-y-0 active:scale-90 motion-reduce:transform-none motion-reduce:transition-none ${link.className}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
