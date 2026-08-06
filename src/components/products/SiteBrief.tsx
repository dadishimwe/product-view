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
    linkItemToDevice,
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
              onToggle={() => toggleItem(item.id)}
              onTextChange={(t) => updateItemText(item.id, t)}
              onRemove={() => removeItem(item.id)}
              onLinkCurrent={
                currentProductSlug && currentProductName
                  ? () =>
                      linkItemToDevice(
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
  onToggle,
  onTextChange,
  onRemove,
  onLinkCurrent,
}: {
  item: {
    id: string;
    text: string;
    done: boolean;
    linkedSlug?: string;
  };
  onToggle: () => void;
  onTextChange: (text: string) => void;
  onRemove: () => void;
  onLinkCurrent?: () => void;
}) {
  const linked = item.linkedSlug
    ? getProductBySlug(item.linkedSlug)
    : undefined;

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
        {linked ? (
          <Link
            href={`/products/${linked.slug}`}
            className="mt-0.5 inline-block truncate font-mono text-[0.6rem] font-medium text-trace underline underline-offset-2"
          >
            → {linked.name}
          </Link>
        ) : onLinkCurrent ? (
          <button
            type="button"
            className="mt-0.5 font-mono text-[0.6rem] font-semibold text-graphite underline underline-offset-2 hover:text-ink"
            onClick={onLinkCurrent}
          >
            Link this device
          </button>
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
