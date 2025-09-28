// src/utils/scrollToGrid.ts
import { RefObject } from "react";

export const scrollToGrid = (
  ref: RefObject<HTMLElement | null>,
  highlightClass = "ring-4 ring-amber-300/30", // ex : classes Tailwind
  duration = 1500,
  block: ScrollLogicalPosition = "start"
) => {
  const el = ref?.current;
  if (!el) return;

  const addClasses = (cls: string) => {
    const tokens = cls.split(/\s+/).filter(Boolean);
    el.classList.add(...tokens);
    return tokens;
  };

  const removeClasses = (tokens: string[]) => {
    if (!tokens || tokens.length === 0) return;
    el.classList.remove(...tokens);
  };

  const tryScroll = () => {
    // Scroll vers l'élément (block: 'start' | 'center' | 'end')
    el.scrollIntoView({ behavior: "smooth", block });

    // Ajout d'une mise en avant temporaire (Tailwind ou custom)
    const added = addClasses(highlightClass);

    // Suppression après la durée
    setTimeout(() => removeClasses(added), duration);
  };

  // Attendre le prochain repaint + petit délai pour être sûr que le layout est calculé
  requestAnimationFrame(() => {
    setTimeout(tryScroll, 40);
  });
};
