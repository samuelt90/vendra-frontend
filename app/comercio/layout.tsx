import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  Instrument_Serif,
  Manrope,
} from "next/font/google";

import CommerceCartProvider from "./components/cart/CommerceCartProvider";
import MobileCommerceNav from "./components/navigation/MobileCommerceNav";
import CartSummary from "./components/cart/CartSummary";

import "./styles/commerce.css";
import "./styles/typography.css";

export const metadata: Metadata = {
  applicationName: "Ecommerce",
  manifest: "/comercio/manifest.webmanifest",

  icons: {
    icon: "/comercio/icon.png",
    apple: "/comercio/icons/ecommerce-192.png",
  },

  appleWebApp: {
    capable: true,
    title: "Ecommerce",
    statusBarStyle: "default",
  },
};

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-commerce-display",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-commerce-sans",
});

export default function ComercioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`
        ${display.variable}
        ${sans.variable}
        commerce-root
      `}
    >
      <CommerceCartProvider>
        {children}
        <CartSummary />
        <MobileCommerceNav />
      </CommerceCartProvider>
    </div>
  );
}

