import { useEffect, useState } from 'react';
import { createCourse, deleteCourse, fetchPaginatedCourses, updateCourse } from '../lib/api';
import { ApiValidationError } from '../lib/api-errors';
import type { FieldErrors } from '../lib/api-errors';
import type { CreateCourseInput } from '../types/course-form';
import type { PaginationMeta } from '../types/pagination';
import type { Course } from '../types/course';
import { useAuthStore } from '../app/store/useAuthStore';

type AdminMutationResult =
  | { ok: true }
  | { ok: false; message: string };

export function useAdminCourses() {
  const defaultPagination: PaginationMeta = {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };
  const token = useAuthStore((state) => state.token);
  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitFieldErrors, setSubmitFieldErrors] = useState<FieldErrors>({});
  const [deletingCourseId, setDeletingCourseId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const loadCourses = async (page = pagination.page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchPaginatedCourses({
        page,
        limit: pagination.limit,
        query: debouncedSearchQuery || undefined,
      });
      setCourses(response.items);
      setPagination(response.pagination);
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
        const response = await fetchPaginatedCourses({
          page: defaultPagination.page,
          limit: defaultPagination.limit,
          query: debouncedSearchQuery || undefined,
        });

        if (isMounted) {
          setCourses(response.items);
          setPagination(response.pagination);
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
  }, [debouncedSearchQuery]);

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
      await createCourse(input, token);
      await loadCourses(1);
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
      await updateCourse(id, input, token);
      await loadCourses();
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
      const nextPage = courses.length === 1 && pagination.page > 1 ? pagination.page - 1 : pagination.page;
      await loadCourses(nextPage);
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

  const goToNextPage = async () => {
    if (!pagination.hasNextPage) {
      return;
    }

    await loadCourses(pagination.page + 1);
  };

  const goToPreviousPage = async () => {
    if (!pagination.hasPreviousPage) {
      return;
    }

    await loadCourses(pagination.page - 1);
  };

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  return {
    courses,
    pagination,
    searchQuery,
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
    goToNextPage,
    goToPreviousPage,
    setSearchQuery: updateSearchQuery,
  };
}
