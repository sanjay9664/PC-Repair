import { PROCESS_STEPS } from "@/data/services";

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="py-5 bg-white border-top">
      <div className="container py-lg-4">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "640px" }}>
          <span className="am-section-kicker">Simple Process</span>
          <h2 className="am-section-title mb-2">How Doorstep Service Works</h2>
          <p className="text-secondary mb-0">
            No complicated portals or advance fees—book in seconds and get
            direct confirmation via WhatsApp, Call, or Email.
          </p>
        </div>

        <div className="row g-4">
          {PROCESS_STEPS.map((item) => (
            <div className="col-sm-6 col-lg-3" key={item.step}>
              <div className="am-step-card p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="am-step-num">STEP {item.step}</span>
                  <i className={`bi ${item.icon} fs-4 text-primary`}></i>
                </div>
                <h3 className="h6 fw-bold mb-2">{item.title}</h3>
                <p className="text-secondary small mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

