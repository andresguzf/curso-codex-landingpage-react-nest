import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { useAuthStore } from '../app/store/useAuthStore';

const initialAuthState = {
  token: null,
  user: null,
  isSubmitting: false,
  error: null,
};

beforeEach(() => {
  window.localStorage.clear();
  useAuthStore.setState(initialAuthState);
  vi.restoreAllMocks();
});

afterEach(() => {
  cleanup();
});
