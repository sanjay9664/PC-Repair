import type { Metadata } from "next";
import ContactFooter from "@/components/ContactFooter";
import FaqPageClient from "@/components/FaqPageClient";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "FAQ & Support | A M Hardware & Software Services at Doorstep",
  description:
    "Frequently asked questions about doorstep laptop/PC repair charges, booking via WhatsApp or Email, UPI/Cash payment, and Noida/Ghaziabad service areas.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          kicker="Help & FAQs"
          title="Frequently Asked Questions"
          description="Clear answers on visit charges, service areas, hardware replacements, and booking via WhatsApp or Email."
          currentPage="FAQ"
          bgImage="/images/service-software-os.jpg"
        />
        <FaqPageClient />
      </main>
      <ContactFooter />
    </>
  );
}

