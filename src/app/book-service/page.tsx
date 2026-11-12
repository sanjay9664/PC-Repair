import type { Metadata } from "next";
import { Suspense } from "react";
import BookServiceClient from "@/components/BookServiceClient";
import ContactFooter from "@/components/ContactFooter";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import TrustStrip from "@/components/TrustStrip";

export const metadata: Metadata = {
  title: "Book Service | A M Hardware & Software Services at Doorstep",
  description:
    "Book doorstep laptop or PC repair in Noida, Ghaziabad, and Vijay Nagar. Send your ticket directly on WhatsApp or Email.",
};

export default function BookServicePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          kicker="Doorstep Booking"
          title="Book Your Laptop or PC Technician"
          description="Submit your device details and send your service ticket directly to our WhatsApp or Email desk in seconds."
          currentPage="Book Service"
          bgImage="/images/hero-laptop-repair.jpg"
        />
        <Suspense
          fallback={
            <div className="container py-5 text-center text-secondary">
              Loading booking form...
            </div>
          }
        >
          <BookServiceClient />
        </Suspense>
        <TrustStrip />
      </main>
      <ContactFooter />
    </>
  );
}

