import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import OptimizedImage from "../common/OptimizedImage";

const formatIssueTime = (value = "") => {
  const normalized = String(value).replace(/^issued\s+/i, "").trim();
  return normalized || "Date not set";
};

function ImagePreviewModal({ item, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} image preview`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[96vh] max-w-[96vw] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <OptimizedImage
          src={item.image}
          alt={item.title}
          className="h-auto max-h-[94vh] w-auto max-w-[96vw] rounded-xl border border-slate-600 object-contain"
          width={1400}
          height={900}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>,
    document.body
  );
}

function CertificateCard({ item }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const hasVerifyLink = Boolean(item.verifyUrl);
  const issueTime = formatIssueTime(item.time);

  return (
    <>
      <article
        className={`section-fade glass-card glass-hover flex h-full flex-col p-4 sm:p-5 ${hasVerifyLink ? "" : "opacity-90"}`}
      >
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="mb-4 block w-full overflow-hidden rounded-xl border border-white/20 bg-slate-950/35"
          aria-label={`Open ${item.title} image preview`}
        >
          <OptimizedImage
            src={item.image}
            alt={item.title}
            className="h-40 w-full object-cover opacity-95"
            width={760}
            height={420}
            sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 100vw"
          />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{issueTime}</p>
        <h3 className="mt-[3px] font-display text-lg font-semibold leading-tight text-ink">{item.title}</h3>
        <div className="flex-1" />

        <div className="mt-4">
          {hasVerifyLink ? (
            <a
              href={item.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-accent/55 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent transition hover:bg-accent hover:text-slate-950"
            >
              Verificar
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-white/30 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
              Verification link not added
            </span>
          )}
        </div>
      </article>

      {isPreviewOpen ? <ImagePreviewModal item={item} onClose={() => setIsPreviewOpen(false)} /> : null}
    </>
  );
}

function BadgeCard({ item }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const hasVerifyLink = Boolean(item.verifyUrl);
  const issueTime = formatIssueTime(item.time);

  return (
    <>
      <article
        className={`section-fade glass-card glass-hover flex h-full flex-col p-4 ${hasVerifyLink ? "" : "opacity-85"}`}
      >
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="mb-3 overflow-hidden rounded-xl border border-white/20 bg-slate-950/35"
          aria-label={`Open ${item.title} image preview`}
        >
          <OptimizedImage
            src={item.image}
            alt={item.title}
            className="aspect-[3/4] w-full object-contain p-3"
            width={600}
            height={800}
            sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 100vw"
          />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{issueTime}</p>
        <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
        <div className="flex-1" />

        <div className="mt-4">
          {hasVerifyLink ? (
            <a
              href={item.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-accent/55 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-accent transition hover:bg-accent hover:text-slate-950"
            >
              Verify
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-white/30 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
              Verification link not added
            </span>
          )}
        </div>
      </article>

      {isPreviewOpen ? <ImagePreviewModal item={item} onClose={() => setIsPreviewOpen(false)} /> : null}
    </>
  );
}

function CredentialCard({ item, variant = "certificate" }) {
  if (variant === "badge") {
    return <BadgeCard item={item} />;
  }

  return <CertificateCard item={item} />;
}

export default CredentialCard;
