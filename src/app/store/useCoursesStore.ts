import { create } from 'zustand';
import { courses as coursesData } from '../../data/courses';
import type { Course } from '../../types/course';

type CoursesState = {
  courses: Course[];
  query: string;
  activeTag: string;
  currentSlide: number;
  setQuery: (query: string) => void;
  setActiveTag: (tag: string) => void;
  setCurrentSlide: (index: number) => void;
};

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: coursesData,
  query: '',
  activeTag: 'all',
  currentSlide: 0,
  setQuery: (query) => set({ query }),
  setActiveTag: (activeTag) => set({ activeTag }),
  setCurrentSlide: (currentSlide) => set({ currentSlide }),
}));
