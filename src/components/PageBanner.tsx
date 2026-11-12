import Link from "next/link";

interface PageBannerProps {
  kicker: string;
  title: string;
  description: string;
  currentPage: string;
  bgImage?: string;
}

export default function PageBanner({
  kicker,
  title,
  description,
  currentPage,
  bgImage = "/images/hero-laptop-repair.jpg",
}: PageBannerProps) {
  return (
    <section className="am-page-banner py-5">
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="am-page-banner-bg"
      />
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item">
              <Link href="/" className="text-info text-decoration-none fw-semibold">
                Home
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-white-50"
              aria-current="page"
            >
              {currentPage}
            </li>
          </ol>
        </nav>

        <span className="am-glass-pill mb-3">{kicker}</span>
        <h1 className="display-5 fw-bold text-white mb-2">{title}</h1>
        <p className="lead text-white-50 mb-0" style={{ maxWidth: "680px" }}>
          {description}
        </p>
      </div>
    </section>
  );
}

