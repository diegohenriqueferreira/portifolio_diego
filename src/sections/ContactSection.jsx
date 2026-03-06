import { useState } from "react";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  message: ""
};

const DEFAULT_FORM_META = {
  title: "",
  time: "",
  description: "",
  appScriptUrl: "https://script.google.com/macros/s/AKfycbxJxm2D2zDWqxnQXKSzYWNkG2hpNcpWUkOY4iVmGDyrVsrxR1X12i0RAq5M0pflfQBI7g/exec",
  sheetId: "1M_1r8einx9mrNaj6G3lBsIn--GBgxreTJ02DOTMqmbU",
  successMessage: "Message sent successfully.",
  errorMessage: "Could not submit your message right now."
};

function ContactSection({ contactForm }) {
  const formMeta = { ...DEFAULT_FORM_META, ...(contactForm || {}) };
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasEndpoint = Boolean(
    formMeta.appScriptUrl && !formMeta.appScriptUrl.includes("REPLACE_WITH")
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasEndpoint) {
      setStatus({
        type: "error",
        message: "Set your Apps Script web app URL in src/data/contactForm.json before submitting."
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const payload = {
        ...formState,
        ...(formMeta.sheetId ? { sheetId: formMeta.sheetId } : {}),
        source: "portfolio-contact-form",
        submittedAt: new Date().toISOString()
      };

      const response = await fetch(formMeta.appScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      const rawResponse = await response.text();
      let parsedResponse = null;

      try {
        parsedResponse = rawResponse ? JSON.parse(rawResponse) : {};
      } catch (_) {
        throw new Error("Apps Script did not return JSON. Verify deployed web app URL.");
      }

      if (!response.ok || parsedResponse?.ok === false) {
        throw new Error(
          parsedResponse?.message || `Submission failed with status ${response.status}`
        );
      }

      setFormState(INITIAL_FORM_STATE);
      setStatus({
        type: "success",
        message: parsedResponse?.message || formMeta.successMessage || "Mensagem enviada com sucesso."
      });
    } catch (error) {
      const detail = error?.message ? ` (${error.message})` : "";
      setStatus({
        type: "error",
        message: `${formMeta.errorMessage ||
          "Could not submit right now. Please verify your Apps Script deployment and sheet access."
          }${detail}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell perf-section scroll-mt-24">
      <div className="glass-surface mx-auto max-w-4xl p-4 sm:p-6">
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">Contato</p>
          <h2 className="mt-1 font-display text-4xl font-semibold text-ink sm:text-[1.6rem]">
            Deixe-me uma mensagem
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="section-fade glass-card p-4 sm:p-5"
        >
          {formMeta.title ? (
            <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">{formMeta.title}</h3>
          ) : null}
          {formMeta.description ? <p className="mt-1 text-sm text-slate-300">{formMeta.description}</p> : null}
          {formMeta.time ? (
            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-accent">{formMeta.time}</p>
          ) : null}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200" htmlFor="contact-name">
              Nome
              <input
                id="contact-name"
                name="nome"
                type="text"
                required
                autoComplete="name"
                value={formState.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/30 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none backdrop-blur-md transition focus:border-accent"
                placeholder="Seu nome"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-200" htmlFor="contact-email">
              Email
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/30 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none backdrop-blur-md transition focus:border-accent"
                placeholder="seuemail@email.com"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-200 sm:col-span-2" htmlFor="contact-message">
              Mensagem
              <textarea
                id="contact-message"
                name="Mensagem"
                required
                rows={4}
                value={formState.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/30 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none backdrop-blur-md transition focus:border-accent"
                placeholder="Digite aqui a sua mensagem"
              />
            </label>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-950 shadow-[0_6px_18px_rgba(184,255,78,0.24)] transition hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-65"
            >
              {isSubmitting ? "Sending..." : "Enviar Mensagem"}
            </button>
            {!hasEndpoint ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                Apps Script URL not configured
              </span>
            ) : null}
          </div>

          {status.message ? (
            <p
              className={`mt-2.5 text-xs ${status.type === "success" ? "text-emerald-300" : "text-rose-300"
                }`}
            >
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
