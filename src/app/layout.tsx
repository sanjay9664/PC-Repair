import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import { BUSINESS_INFO } from "@/data/services";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BUSINESS_INFO.fullBrandName} | Noida & Ghaziabad`,
  description:
    "Doorstep laptop, desktop PC, peripheral, and software repair service in Noida, Ghaziabad, and Vijay Nagar. Send your service booking directly via WhatsApp or Email.",
  keywords: [
    "Doorstep laptop repair Noida",
    "Doorstep PC repair Ghaziabad",
    "Vijay Nagar computer repair",
    "A M Hardware & Software Services",
    "Laptop screen battery keyboard replacement at home",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}

