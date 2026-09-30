"use client";

import { useCallback, useRef } from "react";

/** Returns a function that runs the callback the first time it is called, then never again. */
export function useOnce(): (fn: () => void) => void {
  const done = useRef(false);
  return useCallback((fn: () => void) => {
    if (done.current) return;
    done.current = true;
    fn();
  }, []);
}
