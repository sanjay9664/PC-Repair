"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS_INFO } from "@/data/services";
import { buildWhatsAppUrl } from "@/utils/inquiry";

const NAV_TABS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Hardware Parts", href: "/hardware-parts" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Book Service", href: "/book-service" },
  { label: "Track / Areas", href: "/track" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const quickChatUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.brandName}, I need doorstep computer/laptop service.`
  );

  const closeMobileMenu = () => {
    const navEl = document.getElementById("amMainNav");
    if (navEl && navEl.classList.contains("show")) {
      navEl.classList.remove("show");
    }
  };

  return (
    <header className="sticky-top am-navbar">
      <nav className="navbar navbar-expand-xl py-2 py-lg-3">
        <div className="container">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
          >
            <span className="am-brand-badge">{BUSINESS_INFO.shortName}</span>
            <div className="lh-sm">
              <div className="fw-bold fs-6 text-dark">
                {BUSINESS_INFO.brandName}
              </div>
              <small
                className="text-secondary d-block"
                style={{ fontSize: "0.74rem" }}
              >
                {BUSINESS_INFO.brandTagline}
              </small>
            </div>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#amMainNav"
            aria-controls="amMainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="amMainNav">
            <ul className="navbar-nav mx-auto mb-3 mb-xl-0 gap-1">
              {NAV_TABS.map((tab) => {
                const isActive =
                  tab.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(tab.href);

                return (
                  <li className="nav-item" key={tab.href}>
                    <Link
                      href={tab.href}
                      onClick={closeMobileMenu}
                      className={`nav-link am-nav-link ${isActive ? "active" : ""}`}
                    >
                      {tab.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="d-flex flex-wrap gap-2">
              <a
                href={`tel:${BUSINESS_INFO.primaryPhoneTel}`}
                className="btn btn-am-outline btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-telephone-fill text-primary"></i>
                <span>{BUSINESS_INFO.primaryPhone}</span>
              </a>
              <a
                href={quickChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-am-whatsapp btn-sm px-3 py-2 d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
