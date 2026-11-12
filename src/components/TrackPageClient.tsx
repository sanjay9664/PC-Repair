"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AreasAndTrackSection from "@/components/AreasAndTrackSection";
import { SavedBookingRecord } from "@/utils/inquiry";

const STORAGE_KEY = "am_recent_bookings_v1";

export default function TrackPageClient() {
  const router = useRouter();
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
      // Ignore storage errors
    }
  }, []);

  const handleSelectArea = (area: string) => {
    router.push(`/book-service?area=${encodeURIComponent(area)}`);
  };

  return (
    <AreasAndTrackSection
      recentBookings={recentBookings}
      onSelectArea={handleSelectArea}
    />
  );
}

