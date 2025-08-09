export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  status: 'Published' | 'Draft';
  category: string;
  tags: string[];
}

export interface ArticleFilters {
  search: string;
  author: string;
  status: string;
  category: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export interface ChartData {
  date: string;
  views: number;
  likes: number;
  comments: number;
}

export type SortField = 'views' | 'likes' | 'comments' | 'publishedDate';
export type SortDirection = 'asc' | 'desc';