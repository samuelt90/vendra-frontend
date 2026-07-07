import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";

type Props = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string; // Se mantiene para no romper llamadas existentes, pero no se muestra aquí.
};

type SocialLink = {
  label: string;
  href?: string;
  icon: IconType;
  iconClassName: string;
};

export default function PredioSocialLinks({
  instagram,
  facebook,
  tiktok,
}: Props) {
  const links: SocialLink[] = [
    {
      label: "Facebook",
      href: facebook,
      icon: FaFacebookF,
      iconClassName: "text-[#1877F2]",
    },
    {
      label: "TikTok",
      href: tiktok,
      icon: FaTiktok,
      iconClassName: "text-white",
    },
    {
      label: "Instagram",
      href: instagram,
      icon: FaInstagram,
      iconClassName: "text-[#E1306C]",
    },
  ];

  const availableLinks = links.filter((link) => Boolean(link.href));

  if (!availableLinks.length) return null;

  return (
    <div className="flex shrink-0 items-center justify-end gap-2">
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
            className="group grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition duration-300 active:scale-90 sm:hover:-translate-y-0.5 sm:hover:scale-[1.04] sm:hover:border-white/30 sm:hover:bg-white/[0.1] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Icon
              className={`h-5 w-5 drop-shadow-sm ${link.iconClassName}`}
              aria-hidden="true"
            />
          </a>
        );
      })}
    </div>
  );
}
