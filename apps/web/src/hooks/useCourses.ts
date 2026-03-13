import { useEffect, useMemo } from 'react';
import { useCoursesStore } from '../app/store/useCoursesStore';
import { fetchCourses, fetchCourseTags, fetchCoursesCount, fetchLatestCourses } from '../lib/api';
import { getResultsCopy } from '../lib/course-utils';

export function useCourses() {
  const courses = useCoursesStore((state) => state.courses);
  const latestCourses = useCoursesStore((state) => state.latestCourses);
  const tags = useCoursesStore((state) => state.tags);
  const totalCourses = useCoursesStore((state) => state.totalCourses);
  const isLoading = useCoursesStore((state) => state.isLoading);
  const isLatestLoading = useCoursesStore((state) => state.isLatestLoading);
  const areTagsLoading = useCoursesStore((state) => state.areTagsLoading);
  const isCountLoading = useCoursesStore((state) => state.isCountLoading);
  const error = useCoursesStore((state) => state.error);
  const latestError = useCoursesStore((state) => state.latestError);
  const tagsError = useCoursesStore((state) => state.tagsError);
  const countError = useCoursesStore((state) => state.countError);
  const query = useCoursesStore((state) => state.query);
  const activeTag = useCoursesStore((state) => state.activeTag);
  const currentSlide = useCoursesStore((state) => state.currentSlide);
  const setCourses = useCoursesStore((state) => state.setCourses);
  const setLatestCourses = useCoursesStore((state) => state.setLatestCourses);
  const setTags = useCoursesStore((state) => state.setTags);
  const setTotalCourses = useCoursesStore((state) => state.setTotalCourses);
  const setLoading = useCoursesStore((state) => state.setLoading);
  const setLatestLoading = useCoursesStore((state) => state.setLatestLoading);
  const setTagsLoading = useCoursesStore((state) => state.setTagsLoading);
  const setCountLoading = useCoursesStore((state) => state.setCountLoading);
  const setError = useCoursesStore((state) => state.setError);
  const setLatestError = useCoursesStore((state) => state.setLatestError);
  const setTagsError = useCoursesStore((state) => state.setTagsError);
  const setCountError = useCoursesStore((state) => state.setCountError);
  const setQuery = useCoursesStore((state) => state.setQuery);
  const setActiveTag = useCoursesStore((state) => state.setActiveTag);
  const setCurrentSlide = useCoursesStore((state) => state.setCurrentSlide);

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiCourses = await fetchCourses({
          query: query.trim() || undefined,
          tag: activeTag,
        });
        if (!isMounted) {
          return;
        }

        setCourses(apiCourses);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el catalogo');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadCourses();

    return () => {
      isMounted = false;
    };
  }, [activeTag, query, setCourses, setError, setLoading]);

  useEffect(() => {
    let isMounted = true;

    const loadLatestCourses = async () => {
      setLatestLoading(true);
      setLatestError(null);

      try {
        const apiCourses = await fetchLatestCourses(3);
        if (!isMounted) {
          return;
        }

        setLatestCourses(apiCourses);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setLatestError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los ultimos cursos');
      } finally {
        if (isMounted) {
          setLatestLoading(false);
        }
      }
    };

    void loadLatestCourses();

    return () => {
      isMounted = false;
    };
  }, [setLatestCourses, setLatestError, setLatestLoading]);

  useEffect(() => {
    let isMounted = true;

    const loadTags = async () => {
      setTagsLoading(true);
      setTagsError(null);

      try {
        const apiTags = await fetchCourseTags();
        if (!isMounted) {
          return;
        }

        setTags(['all', ...apiTags]);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setTagsError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los filtros');
      } finally {
        if (isMounted) {
          setTagsLoading(false);
        }
      }
    };

    void loadTags();

    return () => {
      isMounted = false;
    };
  }, [setTags, setTagsError, setTagsLoading]);

  useEffect(() => {
    let isMounted = true;

    const loadCount = async () => {
      setCountLoading(true);
      setCountError(null);

      try {
        const count = await fetchCoursesCount();
        if (!isMounted) {
          return;
        }

        setTotalCourses(count);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setCountError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el total de cursos');
      } finally {
        if (isMounted) {
          setCountLoading(false);
        }
      }
    };

    void loadCount();

    return () => {
      isMounted = false;
    };
  }, [setCountError, setCountLoading, setTotalCourses]);

  const resultsCopy = useMemo(() => getResultsCopy(courses.length, query, activeTag), [activeTag, courses.length, query]);

  return {
    courses,
    latestCourses,
    tags,
    totalCourses,
    isLoading,
    isLatestLoading,
    areTagsLoading,
    isCountLoading,
    error,
    latestError,
    tagsError,
    countError,
    query,
    activeTag,
    currentSlide,
    resultsCopy,
    setQuery,
    setActiveTag,
    setCurrentSlide,
  };
}
