import coursesJson from '../../courses.json';
import { coursesSchema } from '../schemas/course-schema';
import type { Course } from '../types/course';

export const courses: Course[] = coursesSchema.parse(coursesJson);
