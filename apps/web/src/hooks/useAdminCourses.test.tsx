import { renderHook, waitFor, act } from '@testing-library/react';
import { useAdminCourses } from './useAdminCourses';
import { useAuthStore } from '../app/store/useAuthStore';
import { createCourse, fetchPaginatedCourses } from '../lib/api';
import { adminUser, baseCourse, defaultPagination, secondCourse } from '../test/fixtures';

vi.mock('../lib/api', () => ({
  fetchPaginatedCourses: vi.fn(),
  createCourse: vi.fn(),
  updateCourse: vi.fn(),
  deleteCourse: vi.fn(),
}));

describe('useAdminCourses', () => {
  const mockedFetchPaginatedCourses = vi.mocked(fetchPaginatedCourses);
  const mockedCreateCourse = vi.mocked(createCourse);

  beforeEach(() => {
    useAuthStore.setState({
      token: 'token-admin',
      user: adminUser,
      isSubmitting: false,
      error: null,
    });
  });

  it('carga la primera pagina y vuelve a consultar al buscar por titulo', async () => {
    mockedFetchPaginatedCourses
      .mockResolvedValueOnce({
        items: [baseCourse, secondCourse],
        pagination: defaultPagination,
      })
      .mockResolvedValueOnce({
        items: [baseCourse],
        pagination: {
          ...defaultPagination,
          total: 1,
        },
      });

    const { result } = renderHook(() => useAdminCourses());

    await waitFor(() => {
      expect(result.current.courses).toHaveLength(2);
    });

    act(() => {
      result.current.setSearchQuery('React');
    });

    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
    });

    await waitFor(() => {
      expect(mockedFetchPaginatedCourses).toHaveBeenLastCalledWith({
        page: 1,
        limit: 8,
        query: 'React',
      });
    });

    expect(result.current.courses).toEqual([baseCourse]);
  });

  it('crea un curso y refresca la primera pagina', async () => {
    mockedFetchPaginatedCourses
      .mockResolvedValueOnce({
        items: [baseCourse],
        pagination: {
          ...defaultPagination,
          total: 1,
        },
      })
      .mockResolvedValueOnce({
        items: [secondCourse, baseCourse],
        pagination: {
          ...defaultPagination,
          total: 2,
        },
      });
    mockedCreateCourse.mockResolvedValue(secondCourse);

    const { result } = renderHook(() => useAdminCourses());

    await waitFor(() => {
      expect(result.current.courses).toHaveLength(1);
    });

    await act(async () => {
      await result.current.createCourse({
        slug: secondCourse.slug,
        title: secondCourse.title,
        category: secondCourse.category,
        description: secondCourse.description,
        hours: secondCourse.hours,
        rating: secondCourse.rating,
        price: secondCourse.price,
        best_sellers: secondCourse.best_sellers,
        tags: secondCourse.tags,
      });
    });

    expect(mockedCreateCourse).toHaveBeenCalledWith(
      {
        slug: secondCourse.slug,
        title: secondCourse.title,
        category: secondCourse.category,
        description: secondCourse.description,
        hours: secondCourse.hours,
        rating: secondCourse.rating,
        price: secondCourse.price,
        best_sellers: secondCourse.best_sellers,
        tags: secondCourse.tags,
      },
      'token-admin',
    );

    expect(mockedFetchPaginatedCourses).toHaveBeenLastCalledWith({
      page: 1,
      limit: 8,
      query: undefined,
    });
    expect(result.current.courses).toEqual([secondCourse, baseCourse]);
  });
});
