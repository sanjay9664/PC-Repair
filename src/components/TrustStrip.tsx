import { TRUST_PILLARS } from "@/data/services";

export default function TrustStrip() {
  return (
    <section className="py-4 bg-white border-bottom">
      <div className="container">
        <div className="row g-3 g-lg-4">
          {TRUST_PILLARS.map((item) => (
            <div className="col-sm-6 col-lg-3" key={item.title}>
              <div className="d-flex align-items-start gap-3 p-2">
                <div
                  className="am-icon-box am-icon-primary flex-shrink-0"
                  style={{ width: 46, height: 46, fontSize: "1.2rem" }}
                >
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <div>
                  <h3 className="h6 fw-bold mb-1">{item.title}</h3>
                  <p className="text-secondary small mb-0">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

