"use client";

import Link from "next/link";
import { useState } from "react";
import { useSiteBrief } from "@/context/SiteBriefContext";
import { getProductBySlug } from "@/lib/products";
import { SiteBriefHelp } from "./SiteBriefHelp";

export function SiteBrief({
  currentProductSlug,
  currentProductName,
}: {
  currentProductSlug?: string;
  currentProductName?: string;
}) {
  const {
    hydrated,
    items,
    scratch,
    setScratch,
    addItem,
    addLinkedDevice,
    toggleItem,
    updateItemText,
    addDeviceToItem,
    removeItem,
    clearDone,
  } = useSiteBrief();
  const [draft, setDraft] = useState("");

  const submitDraft = () => {
    if (!draft.trim()) return;
    addItem(draft);
    setDraft("");
  };

  const doneCount = items.filter((i) => i.done).length;

  if (!hydrated) return null;

  return (
    <div className="site-note">
      <span className="site-note-tape" aria-hidden />
      <div className="mb-2 flex items-start justify-between gap-1">
        <div className="min-w-0">
          <p className="field-label mb-0.5">Site brief</p>
          <p className="text-[0.625rem] leading-tight text-graphite">
            Requirements &amp; finds
            {items.length > 0 ? (
              <span className="font-mono tabular-nums">
                {" "}
                · {doneCount}/{items.length}
              </span>
            ) : null}
          </p>
        </div>
        <SiteBriefHelp />
      </div>

      {items.length > 0 ? (
        <ul className="site-brief-list mb-2 max-h-[140px] space-y-1 overflow-y-auto pr-0.5">
          {items.map((item) => (
            <BriefRow
              key={item.id}
              item={item}
              currentProductSlug={currentProductSlug}
              onToggle={() => toggleItem(item.id)}
              onTextChange={(t) => updateItemText(item.id, t)}
              onRemove={() => removeItem(item.id)}
              onAddCurrentDevice={
                currentProductSlug && currentProductName
                  ? () =>
                      addDeviceToItem(
                        item.id,
                        currentProductSlug,
                        currentProductName,
                      )
                  : undefined
              }
            />
          ))}
        </ul>
      ) : (
        <p className="mb-2 text-[0.6875rem] text-graphite">
          Add must-haves below — they follow you across products.
        </p>
      )}

      <div className="flex gap-1">
        <label className="sr-only" htmlFor="site-brief-add">
          Add requirement
        </label>
        <input
          id="site-brief-add"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitDraft();
            }
          }}
          placeholder="e.g. PoE+, 1U max…"
          className="site-brief-input min-w-0 flex-1"
        />
        <button
          type="button"
          className="site-brief-add-btn"
          onClick={submitDraft}
          disabled={!draft.trim()}
        >
          +
        </button>
      </div>

      {currentProductSlug && currentProductName ? (
        <button
          type="button"
          className="site-brief-pin mt-1.5 w-full text-left"
          onClick={() =>
            addLinkedDevice(currentProductName, currentProductSlug)
          }
        >
          Pin {currentProductName}
        </button>
      ) : null}

      <label className="sr-only" htmlFor="site-brief-scratch">
        Project scratch notes
      </label>
      <textarea
        id="site-brief-scratch"
        value={scratch}
        onChange={(e) => setScratch(e.target.value)}
        rows={2}
        placeholder="Site / client context (optional)…"
        className="site-brief-scratch mt-2"
      />

      {doneCount > 0 ? (
        <button
          type="button"
          className="mt-1 text-[0.625rem] font-semibold text-trace underline underline-offset-2"
          onClick={clearDone}
        >
          Clear completed
        </button>
      ) : null}
    </div>
  );
}

function BriefRow({
  item,
  currentProductSlug,
  onToggle,
  onTextChange,
  onRemove,
  onAddCurrentDevice,
}: {
  item: {
    id: string;
    text: string;
    done: boolean;
    linkedSlugs: string[];
  };
  currentProductSlug?: string;
  onToggle: () => void;
  onTextChange: (text: string) => void;
  onRemove: () => void;
  onAddCurrentDevice?: () => void;
}) {
  const linkedProducts = item.linkedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);
  const canAddCurrent =
    onAddCurrentDevice &&
    currentProductSlug &&
    !item.linkedSlugs.includes(currentProductSlug);

  return (
    <li className="flex items-start gap-1.5">
      <input
        type="checkbox"
        checked={item.done}
        onChange={onToggle}
        className="site-brief-check mt-0.5 shrink-0"
        aria-label={`Mark "${item.text}" complete`}
      />
      <div className="min-w-0 flex-1">
        <input
          type="text"
          value={item.text}
          onChange={(e) => onTextChange(e.target.value)}
          className={`site-brief-line w-full ${item.done ? "site-brief-line--done" : ""}`}
        />
        {linkedProducts.length > 0 || canAddCurrent ? (
          <div className="site-brief-links mt-0.5 flex flex-wrap items-center gap-x-0.5 gap-y-0.5">
            {linkedProducts.map((p, index) => (
              <span key={p!.slug} className="inline-flex max-w-full items-center">
                {index > 0 ? (
                  <span className="mx-0.5 text-[0.55rem] text-graphite/70">
                    ·
                  </span>
                ) : null}
                <Link
                  href={`/products/${p!.slug}`}
                  className="truncate font-mono text-[0.6rem] font-medium text-trace underline underline-offset-2"
                  title={p!.name}
                >
                  {p!.name}
                </Link>
                {index === linkedProducts.length - 1 && canAddCurrent ? (
                  <button
                    type="button"
                    className="site-brief-link-more"
                    aria-label="Link another device to this line"
                    title="Link current device"
                    onClick={onAddCurrentDevice}
                  >
                    +
                  </button>
                ) : null}
              </span>
            ))}
            {linkedProducts.length === 0 && canAddCurrent ? (
              <button
                type="button"
                className="font-mono text-[0.6rem] font-semibold text-graphite underline underline-offset-2 hover:text-ink"
                onClick={onAddCurrentDevice}
              >
                Link this device
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className="site-brief-remove shrink-0"
        aria-label={`Remove "${item.text}"`}
        onClick={onRemove}
      >
        ×
      </button>
    </li>
  );
}
