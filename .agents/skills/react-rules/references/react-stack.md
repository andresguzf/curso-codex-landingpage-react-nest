# React Stack

## Dependencias Base

Usar como base:

- `react` y `react-dom` en `19.1.1` o una version estable superior confirmada en la documentacion oficial.
- `typescript`
- `zustand`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`

Si la app consume API y requiere cache compartido:

- `@tanstack/react-query` o `swr`

## Comandos De Referencia

Ejemplo con Vite:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install zustand zod react-hook-form @hookform/resolvers
```

Si la app requiere cache de datos:

```bash
npm install @tanstack/react-query
```

## Store Minimo Con Zustand

```ts
import { create } from 'zustand';

type CounterState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
```

## Formulario Minimo Con Zod

```ts
import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1, 'El titulo es obligatorio'),
  email: z.string().email('Correo invalido'),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
```

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { courseSchema, type CourseFormValues } from '../schemas/course-schema';

export function CourseForm() {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      email: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    courseSchema.parse(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...form.register('title')} />
      <input {...form.register('email')} />
      <button type="submit">Guardar</button>
    </form>
  );
}
```

## Criterio De Uso

- Elegir Zustand para estado global sencillo y local al frontend.
- Elegir React Query o SWR para datos remotos y sincronizacion con servidor.
- Evitar usar `useEffect` para derivar valores que pueden calcularse en render.
