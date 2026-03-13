import { create } from 'zustand';
import type { Course } from '../../types/course';

type CoursesState = {
  courses: Course[];
  latestCourses: Course[];
  tags: string[];
  totalCourses: number;
  isLoading: boolean;
  isLatestLoading: boolean;
  areTagsLoading: boolean;
  isCountLoading: boolean;
  error: string | null;
  latestError: string | null;
  tagsError: string | null;
  countError: string | null;
  query: string;
  activeTag: string;
  currentSlide: number;
  setCourses: (courses: Course[]) => void;
  setLatestCourses: (courses: Course[]) => void;
  setTags: (tags: string[]) => void;
  setTotalCourses: (value: number) => void;
  setLoading: (value: boolean) => void;
  setLatestLoading: (value: boolean) => void;
  setTagsLoading: (value: boolean) => void;
  setCountLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
  setLatestError: (message: string | null) => void;
  setTagsError: (message: string | null) => void;
  setCountError: (message: string | null) => void;
  setQuery: (query: string) => void;
  setActiveTag: (tag: string) => void;
  setCurrentSlide: (index: number) => void;
};

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  latestCourses: [],
  tags: [],
  totalCourses: 0,
  isLoading: true,
  isLatestLoading: true,
  areTagsLoading: true,
  isCountLoading: true,
  error: null,
  latestError: null,
  tagsError: null,
  countError: null,
  query: '',
  activeTag: 'all',
  currentSlide: 0,
  setCourses: (courses) => set({ courses }),
  setLatestCourses: (latestCourses) => set({ latestCourses }),
  setTags: (tags) => set({ tags }),
  setTotalCourses: (totalCourses) => set({ totalCourses }),
  setLoading: (isLoading) => set({ isLoading }),
  setLatestLoading: (isLatestLoading) => set({ isLatestLoading }),
  setTagsLoading: (areTagsLoading) => set({ areTagsLoading }),
  setCountLoading: (isCountLoading) => set({ isCountLoading }),
  setError: (error) => set({ error }),
  setLatestError: (latestError) => set({ latestError }),
  setTagsError: (tagsError) => set({ tagsError }),
  setCountError: (countError) => set({ countError }),
  setQuery: (query) => set({ query }),
  setActiveTag: (activeTag) => set({ activeTag }),
  setCurrentSlide: (currentSlide) => set({ currentSlide }),
}));
