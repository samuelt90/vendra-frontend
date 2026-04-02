import { ApartaProvider } from "../context/ApartaContext";
import FloatingCart from "./components/FloatingCart";
export default function ApartaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApartaProvider><FloatingCart></FloatingCart>{children}</ApartaProvider>;
}