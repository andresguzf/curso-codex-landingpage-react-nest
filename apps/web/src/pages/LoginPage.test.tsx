import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';
import { useAuth } from '../hooks/useAuth';

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('LoginPage', () => {
  const mockedUseAuth = vi.mocked(useAuth);

  it('envia credenciales y redirige al dashboard cuando el login es exitoso', async () => {
    const login = vi.fn().mockResolvedValue(true);
    mockedUseAuth.mockReturnValue({
      token: null,
      user: null,
      error: null,
      isSubmitting: false,
      isAuthenticated: false,
      login,
      logout: vi.fn(),
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage isLightTheme={false} onToggleTheme={vi.fn()} />} />
          <Route path="/admin" element={<div>Dashboard destino</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Entrar al dashboard' }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'admin@example.com',
        password: 'Admin12345',
      });
    });

    expect(await screen.findByText('Dashboard destino')).toBeInTheDocument();
  });

  it('muestra el error del login cuando el backend rechaza la sesion', async () => {
    const login = vi.fn().mockResolvedValue(false);
    mockedUseAuth.mockReturnValue({
      token: null,
      user: null,
      error: 'Credenciales invalidas',
      isSubmitting: false,
      isAuthenticated: false,
      login,
      logout: vi.fn(),
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage isLightTheme={false} onToggleTheme={vi.fn()} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Entrar al dashboard' }));

    expect(await screen.findByText('Credenciales invalidas')).toBeInTheDocument();
  });
});
