import { create } from 'zustand';
import type { AuthUser } from '../../types/auth';

const authStorageKey = 'codecimena-auth-session';

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isSubmitting: boolean;
  error: string | null;
  setSubmitting: (value: boolean) => void;
  setError: (message: string | null) => void;
  setSession: (payload: { token: string; user: AuthUser }) => void;
  clearSession: () => void;
};

type PersistedSession = {
  token: string;
  user: AuthUser;
};

function readPersistedSession(): PersistedSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(authStorageKey);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as PersistedSession;
  } catch {
    window.localStorage.removeItem(authStorageKey);
    return null;
  }
}

const persistedSession = readPersistedSession();

export const useAuthStore = create<AuthState>((set) => ({
  token: persistedSession?.token ?? null,
  user: persistedSession?.user ?? null,
  isSubmitting: false,
  error: null,
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  setSession: ({ token, user }) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(authStorageKey, JSON.stringify({ token, user }));
    }

    set({
      token,
      user,
      error: null,
      isSubmitting: false,
    });
  },
  clearSession: () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(authStorageKey);
    }

    set({
      token: null,
      user: null,
      error: null,
      isSubmitting: false,
    });
  },
}));
