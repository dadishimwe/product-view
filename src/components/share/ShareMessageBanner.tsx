"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  decodeShareNote,
  shareDismissStorageKey,
  SHARE_NOTE_PARAM,
} from "@/lib/share-url";

function ShareMessageBannerInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const encoded = searchParams.get(SHARE_NOTE_PARAM);
  const message = useMemo(() => decodeShareNote(encoded), [encoded]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!encoded) return;
    try {
      if (
        sessionStorage.getItem(shareDismissStorageKey(pathname, encoded)) ===
        "1"
      ) {
        setDismissed(true);
      }
    } catch {
      /* ignore */
    }
  }, [encoded, pathname]);

  const dismiss = useCallback(() => {
    if (encoded) {
      try {
        sessionStorage.setItem(
          shareDismissStorageKey(pathname, encoded),
          "1",
        );
      } catch {
        /* ignore */
      }
    }
    setDismissed(true);
  }, [encoded, pathname]);

  if (!message || dismissed) return null;

  return (
    <div
      className="share-message-banner"
      role="status"
      aria-live="polite"
    >
      <div className="share-message-banner__inner catalog-frame mx-auto max-w-[1600px]">
        <div className="min-w-0 flex-1 pr-3">
          <p className="field-label mb-1">Message with this link</p>
          <p className="text-sm leading-relaxed text-ink">{message}</p>
        </div>
        <button
          type="button"
          className="share-message-banner__close"
          aria-label="Dismiss message"
          onClick={dismiss}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function ShareMessageBanner() {
  return (
    <Suspense fallback={null}>
      <ShareMessageBannerInner />
    </Suspense>
  );
}
