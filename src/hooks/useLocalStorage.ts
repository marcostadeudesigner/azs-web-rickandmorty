import { useState, useEffect, useSyncExternalStore } from "react";

export function useLocalStorageSyncedState<T>(key: string, initialValue: T) {
  const isBrowser = typeof window !== "undefined";

  const subscribe = (callback: () => void) => {
    if (!isBrowser) return () => {};
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  };

  const getSnapshot = () => {
    if (!isBrowser) return JSON.stringify(initialValue);
    return localStorage.getItem(key);
  };

  const store = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => JSON.stringify(initialValue)
  );

  const [state, setState] = useState<T>(() => {
    if (!isBrowser) return initialValue;
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isBrowser]);

  return [state, setState] as const;
}
