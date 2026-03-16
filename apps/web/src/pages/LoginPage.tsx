import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompactHeader } from '../components/layout/CompactHeader';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

type LoginPageProps = {
  isLightTheme: boolean;
  onToggleTheme: () => void;
};

export function LoginPage({ isLightTheme, onToggleTheme }: LoginPageProps) {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin12345');
  const navigate = useNavigate();
  const { login, isSubmitting, error } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSuccess = await login({ email, password });

    if (isSuccess) {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className={`app-shell${isLightTheme ? ' theme-light' : ''}`}>
      <div className="page-shell">
        <CompactHeader isLightTheme={isLightTheme} onToggleTheme={onToggleTheme} action={{ label: 'Volver al landing', href: '/' }} />

        <main className="site-main auth-main">
          <section className="auth-panel">
            <div className="auth-copy">
              <span className="eyebrow">Acceso privado</span>
              <h1>Ingresa al panel admin con la misma estetica del landing.</h1>
              <p className="hero-lead">
                Un acceso simple para administrar la plataforma sin mezclarlo con la navegacion publica. El dashboard queda
                fuera del menu principal y mantiene la misma atmosfera visual.
              </p>

              <div className="hero-proof">
                <article className="proof-card">
                  <span>Acceso</span>
                  <strong>JWT contra Nest</strong>
                </article>
                <article className="proof-card">
                  <span>Area privada</span>
                  <strong>Dashboard protegido</strong>
                </article>
              </div>
            </div>

            <div className="auth-card">
              <div className="latest-panel-header auth-card-header">
                <div>
                  <span className="eyebrow">Login</span>
                  <h2>Panel administrativo</h2>
                </div>
                <p>Usa el usuario seed del backend para validar el flujo.</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <label className="field">
                  <span>Email</span>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
                </label>

                <label className="field">
                  <span>Contrasena</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                </label>

                {error ? <p className="form-feedback is-error">{error}</p> : null}

                <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Ingresando...' : 'Entrar al dashboard'}
                </button>
              </form>

              <div className="auth-hint">
                <strong>Demo backend</strong>
                <p>`admin@example.com` con la contrasena seed del proyecto.</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
