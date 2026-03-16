import { useEffect, useState } from 'react';
import { createCourse, deleteCourse, fetchCourses, updateCourse } from '../lib/api';
import { ApiValidationError } from '../lib/api-errors';
import type { FieldErrors } from '../lib/api-errors';
import type { CreateCourseInput } from '../types/course-form';
import type { Course } from '../types/course';
import { useAuthStore } from '../app/store/useAuthStore';

type AdminMutationResult =
  | { ok: true }
  | { ok: false; message: string };

export function useAdminCourses() {
  const token = useAuthStore((state) => state.token);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitFieldErrors, setSubmitFieldErrors] = useState<FieldErrors>({});
  const [deletingCourseId, setDeletingCourseId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadCourses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const nextCourses = await fetchCourses();
      setCourses(nextCourses);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la tabla de cursos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const syncCourses = async () => {
      setIsLoading(true);
      setError(null);

        if (!isMounted) {
          return;
        }

      try {
        const nextCourses = await fetchCourses();

        if (isMounted) {
          setCourses(nextCourses);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la tabla de cursos');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void syncCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateCourse = async (input: CreateCourseInput): Promise<AdminMutationResult> => {
    if (!token) {
      const message = 'No hay una sesion valida para crear cursos';
      setSubmitError(message);
      return { ok: false, message };
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitFieldErrors({});

    try {
      const createdCourse = await createCourse(input, token);
      setCourses((currentCourses) => [createdCourse, ...currentCourses.filter((course) => course.id !== createdCourse.id)]);
      return { ok: true };
    } catch (submitError) {
      if (submitError instanceof ApiValidationError) {
        setSubmitError(submitError.message);
        setSubmitFieldErrors(submitError.fieldErrors);
        return { ok: false, message: submitError.message };
      }

      const message = submitError instanceof Error ? submitError.message : 'No se pudo crear el curso';
      setSubmitError(message);
      return { ok: false, message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCourse = async (id: number, input: CreateCourseInput): Promise<AdminMutationResult> => {
    if (!token) {
      const message = 'No hay una sesion valida para actualizar cursos';
      setSubmitError(message);
      return { ok: false, message };
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitFieldErrors({});

    try {
      const updatedCourse = await updateCourse(id, input, token);
      setCourses((currentCourses) =>
        currentCourses.map((course) => (course.id === id ? updatedCourse : course)),
      );
      return { ok: true };
    } catch (submitError) {
      if (submitError instanceof ApiValidationError) {
        setSubmitError(submitError.message);
        setSubmitFieldErrors(submitError.fieldErrors);
        return { ok: false, message: submitError.message };
      }

      const message = submitError instanceof Error ? submitError.message : 'No se pudo actualizar el curso';
      setSubmitError(message);
      return { ok: false, message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id: number): Promise<AdminMutationResult> => {
    if (!token) {
      const message = 'No hay una sesion valida para eliminar cursos';
      setDeleteError(message);
      return { ok: false, message };
    }

    setDeletingCourseId(id);
    setDeleteError(null);

    try {
      await deleteCourse(id, token);
      setCourses((currentCourses) => currentCourses.filter((course) => course.id !== id));
      return { ok: true };
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'No se pudo eliminar el curso';
      setDeleteError(message);
      return { ok: false, message };
    } finally {
      setDeletingCourseId(null);
    }
  };

  const resetMutationState = () => {
    setSubmitError(null);
    setSubmitFieldErrors({});
  };

  return {
    courses,
    isLoading,
    error,
    isSubmitting,
    submitError,
    submitFieldErrors,
    deletingCourseId,
    deleteError,
    createCourse: handleCreateCourse,
    updateCourse: handleUpdateCourse,
    deleteCourse: handleDeleteCourse,
    resetMutationState,
    refreshCourses: loadCourses,
  };
}
