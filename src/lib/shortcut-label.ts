/** Modifier key label for palette shortcut hints (client-only). */
export function paletteShortcutLabel() {
  if (typeof navigator === "undefined") return "⌘K";
  const isMac = /Mac|iPhone|iPad/i.test(navigator.platform);
  return isMac ? "⌘K" : "Ctrl+K";
}
