"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HouseSimple,
  List,
  MagnifyingGlass,
  SquaresFour,
} from "@phosphor-icons/react";

const items = [
  {
    label: "Inicio",
    href: "/comercio",
    icon: HouseSimple,
    type: "route",
  },
  {
    label: "Buscar",
    href: "/comercio/buscar",
    icon: MagnifyingGlass,
    type: "route",
  },
  {
    label: "Productos",
    href: "/comercio#productos",
    icon: SquaresFour,
    type: "anchor",
  },
  {
    label: "Más",
    href: "/comercio#commerce-footer",
    icon: List,
    type: "anchor",
  },
];

export default function MobileCommerceNav() {
const pathname = usePathname();

const hidden =
  pathname === "/comercio/completar-compra";

if (hidden) {
  return null;
}
  return (
    <nav
      aria-label="Navegación principal"
      className="
        fixed
        inset-x-0
        bottom-0
        z-[100]
        border-t
        border-[var(--commerce-line)]
        bg-[var(--commerce-paper)]

        md:hidden
      "
    >
      <div
        className="
          grid
          grid-cols-4
          pb-[env(safe-area-inset-bottom)]
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            item.type === "route" &&
            pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={
                active ? "page" : undefined
              }
              className="
                commerce-sans
                relative
                flex
                min-h-[66px]
                flex-col
                items-center
                justify-center
                gap-1.5
                text-[0.64rem]
                font-[650]
                tracking-[-0.02em]
              "
            >
              <Icon
                size={21}
                weight={
                  active
                    ? "fill"
                    : "regular"
                }
              />

              <span>
                {item.label}
              </span>

              {active && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-1.5
                    h-[2px]
                    w-5
                    bg-[var(--commerce-ink)]
                  "
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
