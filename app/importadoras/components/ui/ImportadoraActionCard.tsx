import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "../icons/ImportadoraIcons";

type ImportadoraActionCardProps = {
  href: string;
  title: string;
  text: string;
  actionLabel: string;
  icon: ReactNode;
};

export default function ImportadoraActionCard({
  href,
  title,
  text,
  actionLabel,
  icon,
}: ImportadoraActionCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_55px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#f59e0b]/35 hover:bg-white/[0.065] active:scale-[0.98]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#f59e0b]/10 blur-3xl transition group-hover:bg-[#f59e0b]/18" />

      <div className="relative z-10 grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.12)]">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-[-0.03em] text-white">
            {title}
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-white/58">
            {text}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f59e0b]">
            {actionLabel}
            <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}