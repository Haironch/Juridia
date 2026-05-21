import { useMemo } from 'react';

export interface ShuffledOption {
  key: string;   // clave original — solo para validación interna
  label: string; // letra mostrada al usuario (A/B/C según posición del shuffle)
  text: string;
}

function fisherYates<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Shuffles opciones once per question (re-shuffles when questionId changes).
// `key` is the original key for answer validation; `label` is the display letter
// based on shuffled position so the visible letter doesn't reveal the correct key.
export function useShuffledOptions(
  opciones: Record<string, string>,
  questionId: number
): ShuffledOption[] {
  return useMemo(() => {
    const entries = Object.entries(opciones).map(([key, text]) => ({ key, text }));
    const shuffled = fisherYates(entries);
    return shuffled.map((opt, i) => ({
      ...opt,
      label: String.fromCharCode(65 + i), // A, B, C… según posición
    }));
  }, [questionId]); // eslint-disable-line react-hooks/exhaustive-deps
}
