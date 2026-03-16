import { useEffect, useState } from 'react';
import { createCourseInputSchema } from '../../schemas/course-schema';
import type { CreateCourseInput } from '../../types/course-form';
import type { FieldErrors } from '../../lib/api-errors';

type AdminCourseFormProps = {
  isSubmitting: boolean;
  submitError: string | null;
  fieldErrors: FieldErrors;
  initialValues?: CreateCourseInput;
  submitLabel: string;
  onSubmit: (input: CreateCourseInput) => Promise<{ ok: true } | { ok: false; message: string }>;
  onCancel: () => void;
};

type FormState = {
  slug: string;
  title: string;
  category: string;
  description: string;
  hours: string;
  rating: string;
  price: string;
  tags: string;
  best_sellers: boolean;
};

const initialFormState: FormState = {
  slug: '',
  title: '',
  category: '',
  description: '',
  hours: '8',
  rating: '4.5',
  price: '29.9',
  tags: '',
  best_sellers: false,
};

function toFormState(input?: CreateCourseInput): FormState {
  if (!input) {
    return initialFormState;
  }

  return {
    slug: input.slug,
    title: input.title,
    category: input.category,
    description: input.description,
    hours: String(input.hours),
    rating: String(input.rating),
    price: String(input.price),
    tags: input.tags?.join(', ') ?? '',
    best_sellers: input.best_sellers ?? false,
  };
}

export function AdminCourseForm({
  isSubmitting,
  submitError,
  fieldErrors,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: AdminCourseFormProps) {
  const [form, setForm] = useState<FormState>(toFormState(initialValues));
  const [validationErrors, setValidationErrors] = useState<FieldErrors>({});
  const [serverFieldErrors, setServerFieldErrors] = useState<FieldErrors>({});

  const mergedFieldErrors = {
    ...serverFieldErrors,
    ...validationErrors,
  };

  useEffect(() => {
    setServerFieldErrors(fieldErrors);
  }, [fieldErrors]);

  useEffect(() => {
    setForm(toFormState(initialValues));
    setValidationErrors({});
    setServerFieldErrors({});
  }, [initialValues]);

  const updateField = <TKey extends keyof FormState>(key: TKey, value: FormState[TKey]) => {
    setForm((currentValue) => ({ ...currentValue, [key]: value }));
    setValidationErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[key];
      return nextErrors;
    });
    setServerFieldErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[key];
      return nextErrors;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = createCourseInputSchema.safeParse({
      slug: form.slug.trim(),
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      hours: Number(form.hours),
      rating: Number(form.rating),
      price: Number(form.price),
      best_sellers: form.best_sellers,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    });

    if (!parsed.success) {
      const nextErrors = Object.fromEntries(
        parsed.error.issues
          .map((issue) => [String(issue.path[0] ?? ''), issue.message])
          .filter((entry) => entry[0]),
      );
      setValidationErrors(nextErrors);
      return;
    }

    setValidationErrors({});
    const result = await onSubmit(parsed.data);

    if (result.ok) {
      setForm(toFormState(initialValues));
      setValidationErrors({});
      setServerFieldErrors({});
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form-grid">
        <label className="field">
          <span>Slug</span>
          <input
            className={mergedFieldErrors.slug ? 'is-invalid' : ''}
            value={form.slug}
            onChange={(event) => updateField('slug', event.target.value)}
          />
          {mergedFieldErrors.slug ? <small className="field-error">{mergedFieldErrors.slug}</small> : null}
        </label>

        <label className="field">
          <span>Categoria</span>
          <input
            className={mergedFieldErrors.category ? 'is-invalid' : ''}
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
          />
          {mergedFieldErrors.category ? <small className="field-error">{mergedFieldErrors.category}</small> : null}
        </label>

        <label className="field admin-form-field-span">
          <span>Titulo</span>
          <input
            className={mergedFieldErrors.title ? 'is-invalid' : ''}
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
          />
          {mergedFieldErrors.title ? <small className="field-error">{mergedFieldErrors.title}</small> : null}
        </label>

        <label className="field admin-form-field-span">
          <span>Descripcion</span>
          <textarea
            className={`admin-textarea${mergedFieldErrors.description ? ' is-invalid' : ''}`}
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
          />
          {mergedFieldErrors.description ? <small className="field-error">{mergedFieldErrors.description}</small> : null}
        </label>

        <label className="field">
          <span>Horas</span>
          <input
            className={mergedFieldErrors.hours ? 'is-invalid' : ''}
            type="number"
            min="2"
            max="45"
            step="0.1"
            value={form.hours}
            onChange={(event) => updateField('hours', event.target.value)}
          />
          {mergedFieldErrors.hours ? <small className="field-error">{mergedFieldErrors.hours}</small> : null}
        </label>

        <label className="field">
          <span>Rating</span>
          <input
            className={mergedFieldErrors.rating ? 'is-invalid' : ''}
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(event) => updateField('rating', event.target.value)}
          />
          {mergedFieldErrors.rating ? <small className="field-error">{mergedFieldErrors.rating}</small> : null}
        </label>

        <label className="field">
          <span>Precio USD</span>
          <input
            className={mergedFieldErrors.price ? 'is-invalid' : ''}
            type="number"
            min="7"
            max="100"
            step="0.1"
            value={form.price}
            onChange={(event) => updateField('price', event.target.value)}
          />
          {mergedFieldErrors.price ? <small className="field-error">{mergedFieldErrors.price}</small> : null}
        </label>

        <label className="field admin-form-field-span">
          <span>Tags</span>
          <input
            className={mergedFieldErrors.tags ? 'is-invalid' : ''}
            value={form.tags}
            placeholder="react, frontend, hooks"
            onChange={(event) => updateField('tags', event.target.value)}
          />
          {mergedFieldErrors.tags ? <small className="field-error">{mergedFieldErrors.tags}</small> : null}
        </label>
      </div>

      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={form.best_sellers}
          onChange={(event) => setForm((value) => ({ ...value, best_sellers: event.target.checked }))}
        />
        <span>Marcar como best seller</span>
      </label>

      {submitError ? <p className="form-feedback is-error">{submitError}</p> : null}

      <div className="admin-form-actions">
        <button className="secondary-button compact-action-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="primary-button admin-toolbar-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
