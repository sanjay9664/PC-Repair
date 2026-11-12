"use client";

import { useEffect, useState } from "react";
import AreasAndTrackSection from "@/components/AreasAndTrackSection";
import BookingSection from "@/components/BookingSection";
import ContactFooter from "@/components/ContactFooter";
import FaqSection from "@/components/FaqSection";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import TrustStrip from "@/components/TrustStrip";
import { DeviceType } from "@/data/services";
import { SavedBookingRecord } from "@/utils/inquiry";

const STORAGE_KEY = "am_recent_bookings_v1";

export default function HomePageClient() {
  const [preset, setPreset] = useState<{
    device?: string;
    service?: string;
    area?: string;
    nonce: number;
  }>({ nonce: 0 });

  const [recentBookings, setRecentBookings] = useState<SavedBookingRecord[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setRecentBookings(parsed);
        }
      }
    } catch {
      // Ignore invalid localStorage state
    }
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("book");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectDeviceAndService = (device: DeviceType, service: string) => {
    setPreset((prev) => ({
      device,
      service,
      nonce: prev.nonce + 1,
    }));
    scrollToBooking();
  };

  const handleSelectArea = (area: string) => {
    setPreset((prev) => ({
      area,
      nonce: prev.nonce + 1,
    }));
    scrollToBooking();
  };

  const handleBookingCreated = (record: SavedBookingRecord) => {
    setRecentBookings((prev) => {
      const updated = [record, ...prev].slice(0, 5);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel onQuickSelect={handleSelectDeviceAndService} />
        <TrustStrip />
        <ServicesSection onSelectService={handleSelectDeviceAndService} />
        <ProcessSection />
        <BookingSection
          preset={preset}
          onBookingCreated={handleBookingCreated}
        />
        <AreasAndTrackSection
          recentBookings={recentBookings}
          onSelectArea={handleSelectArea}
        />
        <FaqSection />
      </main>
      <ContactFooter />
    </>
  );
}
