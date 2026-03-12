import { useMemo } from 'react';
import { useCoursesStore } from '../app/store/useCoursesStore';
import { filterCourses, getResultsCopy, getUniqueTags } from '../lib/course-utils';

export function useCourses() {
  const courses = useCoursesStore((state) => state.courses);
  const query = useCoursesStore((state) => state.query);
  const activeTag = useCoursesStore((state) => state.activeTag);
  const currentSlide = useCoursesStore((state) => state.currentSlide);
  const setQuery = useCoursesStore((state) => state.setQuery);
  const setActiveTag = useCoursesStore((state) => state.setActiveTag);
  const setCurrentSlide = useCoursesStore((state) => state.setCurrentSlide);

  const latestCourses = useMemo(() => courses.filter((course) => course.latest).slice(0, 3), [courses]);
  const tags = useMemo(() => getUniqueTags(courses), [courses]);
  const filteredCourses = useMemo(() => filterCourses(courses, query, activeTag), [activeTag, courses, query]);
  const resultsCopy = useMemo(() => getResultsCopy(filteredCourses.length, query, activeTag), [activeTag, filteredCourses.length, query]);

  return {
    courses,
    query,
    activeTag,
    currentSlide,
    latestCourses,
    tags,
    filteredCourses,
    resultsCopy,
    setQuery,
    setActiveTag,
    setCurrentSlide,
  };
}
