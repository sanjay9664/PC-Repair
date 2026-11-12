import { FAQ_ITEMS } from "@/data/services";

export default function FaqSection() {
  return (
    <section id="faq" className="py-5">
      <div className="container py-lg-4">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "640px" }}>
          <span className="am-section-kicker">Questions &amp; Answers</span>
          <h2 className="am-section-title mb-2">Frequently Asked Questions</h2>
          <p className="text-secondary mb-0">
            Everything you need to know about our doorstep visit charges,
            booking process, and payment options.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="accordion am-faq" id="amFaqAccordion">
              {FAQ_ITEMS.map((item, idx) => (
                <div className="accordion-item" key={item.id}>
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${item.id}`}
                      aria-expanded={idx === 0 ? "true" : "false"}
                      aria-controls={item.id}
                    >
                      {item.question}
                    </button>
                  </h3>
                  <div
                    id={item.id}
                    className={`accordion-collapse collapse ${
                      idx === 0 ? "show" : ""
                    }`}
                    data-bs-parent="#amFaqAccordion"
                  >
                    <div className="accordion-body text-secondary small lh-lg">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

