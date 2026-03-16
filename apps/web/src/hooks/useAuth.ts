import { useAuthStore } from '../app/store/useAuthStore';
import { loginRequest } from '../lib/api';
import { loginCredentialsSchema } from '../schemas/auth-schema';
import type { LoginCredentials } from '../types/auth';

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isSubmitting = useAuthStore((state) => state.isSubmitting);
  const error = useAuthStore((state) => state.error);
  const setSubmitting = useAuthStore((state) => state.setSubmitting);
  const setError = useAuthStore((state) => state.setError);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  const isAuthenticated = Boolean(token && user);

  const login = async (credentials: LoginCredentials) => {
    const parsed = loginCredentialsSchema.safeParse(credentials);

    if (!parsed.success) {
      const nextError = parsed.error.issues[0]?.message ?? 'Revisa tus credenciales';
      setError(nextError);
      return false;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await loginRequest(parsed.data);
      setSession({
        token: response.access_token,
        user: response.user,
      });
      return true;
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'No se pudo iniciar sesion');
      setSubmitting(false);
      return false;
    }
  };

  const logout = () => {
    clearSession();
  };

  return {
    token,
    user,
    error,
    isSubmitting,
    isAuthenticated,
    login,
    logout,
  };
}
