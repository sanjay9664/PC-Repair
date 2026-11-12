import type { Metadata } from "next";
import ContactFooter from "@/components/ContactFooter";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import TrackPageClient from "@/components/TrackPageClient";

export const metadata: Metadata = {
  title: "Track Ticket & Service Areas | A M Hardware & Software Services",
  description:
    "Check your repair ticket status via WhatsApp or Email and view doorstep service areas in Noida, Ghaziabad, and Vijay Nagar.",
};

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          kicker="Track & Coverage"
          title="Ticket Status & Service Areas"
          description="Check updates on your repair ticket reference via WhatsApp or Email, or choose your area in Noida, Ghaziabad, and Vijay Nagar."
          currentPage="Track / Areas"
          bgImage="/images/hero-desktop-upgrade.jpg"
        />
        <TrackPageClient />
      </main>
      <ContactFooter />
    </>
  );
}

