export type Course = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  hours: number;
  rating: number;
  price: number;
  best_sellers: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
};
