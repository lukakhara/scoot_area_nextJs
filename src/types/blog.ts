export interface BlogAuthor {
  id: string;
  name: string;
}

// List endpoint: GET /blog
export interface BlogPostCard {
  id: string;
  slug: string;
  locale: "en" | "ka";
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null; // JSON has no Date type, so it arrives as an ISO string
  author: BlogAuthor;
}

// Detail endpoint: GET /blog/:id
export interface BlogPost extends BlogPostCard {
  content: string;
  images: string[];
  videos: string[]; // if you add the videos column
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface BlogListResponse {
  data: BlogPostCard[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}