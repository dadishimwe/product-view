import { compareSlugsToParam } from "@/lib/compare-url";

/** Query param for optional share message (base64url). */
export const SHARE_NOTE_PARAM = "m";

const MAX_NOTE_LENGTH = 480;

export function encodeShareNote(note: string): string {
  const trimmed = note.trim().slice(0, MAX_NOTE_LENGTH);
  if (!trimmed) return "";
  const bytes = new TextEncoder().encode(trimmed);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeShareNote(encoded: string | null): string | null {
  if (!encoded?.trim()) return null;
  try {
    let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const text = new TextDecoder().decode(bytes).trim();
    return text || null;
  } catch {
    try {
      return decodeURIComponent(encoded).trim() || null;
    } catch {
      return null;
    }
  }
}

export function buildProductSharePath(
  slug: string,
  encodedNote?: string | null,
): string {
  if (!encodedNote) return `/products/${slug}`;
  const params = new URLSearchParams();
  params.set(SHARE_NOTE_PARAM, encodedNote);
  return `/products/${slug}?${params.toString()}`;
}

export function buildCompareSharePath(
  slugs: string[],
  encodedNote?: string | null,
): string {
  const params = new URLSearchParams();
  const p = compareSlugsToParam(slugs);
  if (p) params.set("p", p);
  if (encodedNote) params.set(SHARE_NOTE_PARAM, encodedNote);
  const q = params.toString();
  return q ? `/compare?${q}` : "/compare";
}

export function absoluteShareUrl(path: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
  }
  return path;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

export function shareDismissStorageKey(pathname: string, encodedNote: string) {
  return `deviceview-share-dismiss:${pathname}:${encodedNote.slice(0, 48)}`;
}
