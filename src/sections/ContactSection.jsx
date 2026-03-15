import { useState } from "react";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  message: ""
};

function ContactSection({ contactForm }) {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Link do seu Formspree
  const FORMSPREE_URL = "https://formspree.io/f/xaqpwzdr";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setFormState(INITIAL_FORM_STATE);
        setStatus({
          type: "success",
          message: contactForm?.successMessage || "Mensagem enviada com sucesso! Responderei em breve."
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao enviar");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: contactForm?.errorMessage || "Ocorreu um erro ao enviar. Tente novamente."
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
            {contactForm?.title || "Deixe-me uma mensagem"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="section-fade glass-card p-4 sm:p-5">
          <p className="mb-4 text-sm text-slate-300">
            {contactForm?.description || "Preencha os campos abaixo para entrar em contato."}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200" htmlFor="contact-name">
              Nome
              <input
                id="contact-name"
                name="name"
                type="text"
                required
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
                name="message"
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
              {isSubmitting ? "Enviando..." : (contactForm?.buttonLabel || "Enviar Mensagem")}
            </button>
          </div>

          {status.message && (
            <p className={`mt-2.5 text-xs ${status.type === "success" ? "text-emerald-300" : "text-rose-300"}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactSection;