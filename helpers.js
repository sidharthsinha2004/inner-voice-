/**
 * utils/helpers.js
 * Small shared utilities: a tiny pub/sub store factory (no external
 * state library needed) plus a couple of generic helpers.
 */

/**
 * Creates a minimal external store: { getState, setState, subscribe }.
 * Compatible with React's useSyncExternalStore.
 */
export function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (updater) => {
    state = typeof updater === "function" ? updater(state) : updater;
    listeners.forEach((listener) => listener());
    return state;
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
}

/** Generates a short, good-enough unique id for sample/local data. */
export function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/** Joins class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Clamps a number between min and max. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}