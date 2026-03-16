export type CreateCourseInput = {
  slug: string;
  title: string;
  category: string;
  description: string;
  hours: number;
  rating: number;
  price: number;
  best_sellers?: boolean;
  tags?: string[];
};
