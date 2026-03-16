import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminCourseForm } from './AdminCourseForm';

describe('AdminCourseForm', () => {
  it('muestra errores de validacion por campo y marca los inputs invalidos', async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: true });
    const user = userEvent.setup();

    const { container } = render(
      <AdminCourseForm
        isSubmitting={false}
        submitError={null}
        fieldErrors={{}}
        submitLabel="Crear curso"
        onSubmit={onSubmit}
        onCancel={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText('Slug'), 'curso-prueba');
    await user.type(screen.getByLabelText('Categoria'), 'Backend');
    await user.type(screen.getByLabelText('Titulo'), 'Corto');
    await user.type(screen.getByLabelText('Descripcion'), 'Descripcion valida');
    await user.clear(screen.getByLabelText('Horas'));
    await user.type(screen.getByLabelText('Horas'), '1');
    await user.clear(screen.getByLabelText('Precio USD'));
    await user.type(screen.getByLabelText('Precio USD'), '6');

    const submitButton = screen.getByRole('button', { name: 'Crear curso' });
    fireEvent.submit(submitButton.closest('form') as HTMLFormElement);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText('El titulo debe tener al menos 10 caracteres')).toBeInTheDocument();
    expect(screen.getByText('Las horas deben ser al menos 2')).toBeInTheDocument();
    expect(screen.getByText('El precio minimo es 7 USD')).toBeInTheDocument();
    expect(container.querySelectorAll('.is-invalid')).toHaveLength(3);
  });
});
