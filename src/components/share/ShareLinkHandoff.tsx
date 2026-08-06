"use client";

import { useId, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

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

  const disabled =
    props.kind === "compare" && props.productSlugs.length === 0;

  return (
    <div className="share-handoff">
      <Button
        type="button"
        variant="secondary"
        className="!text-xs"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Share link
      </Button>
      {open ? (
        <div className="share-handoff-panel catalog-panel mt-2 p-3">
          <label className="field-label mb-1 block" htmlFor={noteId}>
            Optional note for the recipient
          </label>
          <textarea
            id={noteId}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Client site — need PoE+ and 1U max for MDF…"
            className="field-input mb-2 text-sm"
            maxLength={480}
          />
          <p className="mb-2 text-[0.65rem] text-graphite">
            Your note appears once at the top of the page when they open the link.
            Product data is not stored on a server — only what fits in the URL.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="primary" className="!text-xs" onClick={copy}>
              Copy link
            </Button>
            {status === "copied" ? (
              <span className="font-mono text-xs text-graphite">Copied</span>
            ) : null}
            {status === "error" ? (
              <span className="text-xs text-signal-deep">Could not copy — try again</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
