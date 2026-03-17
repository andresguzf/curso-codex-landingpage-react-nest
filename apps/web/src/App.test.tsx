import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuth } from './hooks/useAuth';

vi.mock('./hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('./pages/LoginPage', () => ({
  LoginPage: () => <div>Login mock</div>,
}));

vi.mock('./pages/AdminPage', () => ({
  AdminPage: () => <div>Admin mock</div>,
}));

vi.mock('./pages/CourseDetailPage', () => ({
  CourseDetailPage: () => <div>Detalle mock</div>,
}));

describe('App routes', () => {
  const mockedUseAuth = vi.mocked(useAuth);

  it('redirige /admin a /login cuando no hay sesion', async () => {
    mockedUseAuth.mockReturnValue({
      token: null,
      user: null,
      error: null,
      isSubmitting: false,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Login mock')).toBeInTheDocument();
  });

  it('redirige /login a /admin cuando la sesion ya existe', async () => {
    mockedUseAuth.mockReturnValue({
      token: 'token',
      user: {
        id: 1,
        email: 'admin@example.com',
        created_at: '2026-03-16T10:00:00.000Z',
        updated_at: '2026-03-16T10:00:00.000Z',
      },
      error: null,
      isSubmitting: false,
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Admin mock')).toBeInTheDocument();
  });

  it('renderiza la ruta publica de detalle de curso', async () => {
    mockedUseAuth.mockReturnValue({
      token: null,
      user: null,
      error: null,
      isSubmitting: false,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/cursos/1/react-avanzado']}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Detalle mock')).toBeInTheDocument();
  });
});
