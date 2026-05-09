import { useMemo } from 'react';

export interface ShuffledOption {
  key: string;
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
// Each option retains its original key so answer validation is unaffected.
export function useShuffledOptions(
  opciones: Record<string, string>,
  questionId: number
): ShuffledOption[] {
  return useMemo(() => {
    const entries = Object.entries(opciones).map(([key, text]) => ({ key, text }));
    return fisherYates(entries);
  }, [questionId]); // eslint-disable-line react-hooks/exhaustive-deps
}
