export type CreateCourseInput = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image_url?: string | null;
  hours: number;
  rating: number;
  price: number;
  best_sellers?: boolean;
  tags?: string[];
};

export type CourseFormSubmission = {
  course: CreateCourseInput;
  imageFile: File | null;
};
