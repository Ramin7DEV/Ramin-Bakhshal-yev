// Shared client state for the "live build" layer: the build log, the build counter and the busy flag.
// Components read it through useLiveState(); anything can write to it through `live`.
import { useSyncExternalStore } from 'react';

export type LogKind = 'plain' | 'add' | 'ok' | 'you';
export type LogEntry = { id: number; text: string; kind: LogKind };

type LiveState = {
  log: LogEntry[];
  built: number;
  busy: boolean;
  /** performance.now() of the first build on this page, for the "assembled in" stat */
  startedAt: number;
  lastBuiltAt: number;
  /** Log entries after this id belong to the current page */
  logStart: number;
};

type Events = {
  compile: string;
  navigate: { href: string; label?: string };
};

const MAX_LOG = 40;
let nextId = 1;
let state: LiveState = { log: [], built: 0, busy: false, startedAt: 0, lastBuiltAt: 0, logStart: 0 };
const listeners = new Set<() => void>();
// Compile events are remembered, so a listener that mounts late still sees one that already fired
const compiled = new Set<string>();
const eventListeners: { [K in keyof Events]: Set<(payload: Events[K]) => void> } = {
  compile: new Set(),
  navigate: new Set(),
};

function set(patch: Partial<LiveState>) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn());
}

export const live = {
  log(text: string, kind: LogKind = 'plain') {
    set({ log: [...state.log, { id: nextId++, text, kind }].slice(-MAX_LOG) });
  },
  markBuilt() {
    const now = performance.now();
    set({ built: state.built + 1, startedAt: state.startedAt || now, lastBuiltAt: now });
  },
  setBusy(busy: boolean) {
    if (busy !== state.busy) set({ busy });
  },
  /** A new page starts its own build story */
  reset() {
    compiled.clear();
    set({ built: 0, startedAt: 0, lastBuiltAt: 0, busy: false, logStart: nextId - 1 });
  },
  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    if (event === 'compile') compiled.add(payload as string);
    eventListeners[event].forEach((fn) => fn(payload));
  },
  wasCompiled(id: string) {
    return compiled.has(id);
  },
  on<K extends keyof Events>(event: K, fn: (payload: Events[K]) => void) {
    eventListeners[event].add(fn);
    return () => {
      eventListeners[event].delete(fn);
    };
  },
};

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

const getSnapshot = () => state;

export function useLiveState(): LiveState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
