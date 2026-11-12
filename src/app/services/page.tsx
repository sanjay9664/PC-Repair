import type { Metadata } from "next";
import ContactFooter from "@/components/ContactFooter";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import ServicesPageClient from "@/components/ServicesPageClient";
import TrustStrip from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: "Services | A M Hardware & Software Services at Doorstep",
  description:
    "Doorstep laptop repair, desktop PC repair, peripherals setup, and OS/software support in Noida, Ghaziabad, and Vijay Nagar.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          kicker="Doorstep Services"
          title="Laptop, Desktop PC, Peripherals & Software Care"
          description="Explore everything our technician handles at your home or office across Noida, Ghaziabad, and Vijay Nagar."
          currentPage="Services"
          bgImage="/images/hero-desktop-upgrade.jpg"
        />
        <ServicesPageClient />
        <TrustStrip />
      </main>
      <ContactFooter />
    </>
  );
}

