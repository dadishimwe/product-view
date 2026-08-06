"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  absoluteShareUrl,
  buildCompareSharePath,
  buildProductSharePath,
  copyTextToClipboard,
  encodeShareNote,
} from "@/lib/share-url";

type ShareLinkHandoffProps =
  | { kind: "product"; productSlug: string }
  | { kind: "compare"; productSlugs: string[] };

export function ShareLinkHandoff(props: ShareLinkHandoffProps) {
  const noteId = useId();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const disabled =
    props.kind === "compare" && props.productSlugs.length === 0;

  const close = () => {
    setOpen(false);
    setStatus("idle");
  };

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setStatus("idle");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const buildUrl = () => {
    const encoded = encodeShareNote(note);
    const path =
      props.kind === "product"
        ? buildProductSharePath(props.productSlug, encoded || null)
        : buildCompareSharePath(props.productSlugs, encoded || null);
    return absoluteShareUrl(path);
  };

  const copy = async () => {
    const url = buildUrl();
    const ok = await copyTextToClipboard(url);
    setStatus(ok ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        className="!text-xs"
        disabled={disabled}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        Share link
      </Button>

      {open ? (
        <div
          className="share-link-dialog fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={close}
        >
          <div
            className="catalog-frame share-handoff-panel w-full max-w-md bg-panel p-4 shadow-[6px_8px_0_#14121f]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p id={titleId} className="field-label mb-0">
                  Share link
                </p>
                <p className="mt-1 text-sm text-graphite">
                  Copy a link to this{" "}
                  {props.kind === "compare" ? "comparison" : "product"}.
                </p>
              </div>
              <button
                type="button"
                className="share-link-dialog__close"
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <label className="field-label mb-1 block" htmlFor={noteId}>
              Optional note for the recipient
            </label>
            <textarea
              id={noteId}
              rows={4}
              autoFocus
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Client site — need PoE+ and 1U max for MDF…"
              className="field-input mb-2 text-sm"
              maxLength={480}
            />
            <p className="mb-4 text-[0.65rem] leading-relaxed text-graphite">
              Your note appears once at the top of the page when they open the
              link. Product data is not stored on a server — only what fits in
              the URL.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="primary"
                className="!text-xs"
                onClick={copy}
              >
                Copy link
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="!text-xs"
                onClick={close}
              >
                Cancel
              </Button>
              {status === "copied" ? (
                <span className="font-mono text-xs text-graphite">Copied</span>
              ) : null}
              {status === "error" ? (
                <span className="text-xs text-signal-deep">
                  Could not copy — try again
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
