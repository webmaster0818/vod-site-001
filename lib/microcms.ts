import { createClient } from 'microcms-js-sdk';

// 環境変数が設定されていない場合のフォールバック
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'your-service-domain';
const apiKey = process.env.MICROCMS_API_KEY || 'your-api-key';

if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  console.warn('⚠️ microCMS環境変数が設定されていません。.env.localファイルを作成してください。');
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

// 型定義
export interface VODService {
  fieldId: string;
  name: string;
  url: string;
  available: boolean;
}

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  category: string;
  genre: string;
  releaseYear?: number;
  rating?: number;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
  content: string;
  vodServices?: VODService[];
  tags?: string[];
}

export interface PostsResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * 全記事を取得
 */
export async function getAllPosts(limit: number = 100): Promise<Post[]> {
  try {
    const data = await client.get<PostsResponse>({
      endpoint: 'posts',
      queries: {
        limit,
        orders: '-publishedAt',
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS API Error:', error);
    return [];
  }
}

/**
 * カテゴリ別記事を取得
 */
export async function getPostsByCategory(category: string, limit: number = 100): Promise<Post[]> {
  try {
    const data = await client.get<PostsResponse>({
      endpoint: 'posts',
      queries: {
        limit,
        filters: `category[equals]${category}`,
        orders: '-publishedAt',
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS API Error:', error);
    return [];
  }
}

/**
 * ジャンル別記事を取得
 */
export async function getPostsByGenre(category: string, genre: string, limit: number = 100): Promise<Post[]> {
  try {
    const data = await client.get<PostsResponse>({
      endpoint: 'posts',
      queries: {
        limit,
        filters: `category[equals]${category}[and]genre[equals]${genre}`,
        orders: '-publishedAt',
      },
    });
    return data.contents;
  } catch (error) {
    console.error('microCMS API Error:', error);
    return [];
  }
}

/**
 * 記事詳細を取得
 */
export async function getPostById(id: string): Promise<Post | null> {
  try {
    const data = await client.get<Post>({
      endpoint: 'posts',
      contentId: id,
    });
    return data;
  } catch (error) {
    console.error('microCMS API Error:', error);
    return null;
  }
}

/**
 * カテゴリ一覧を取得（記事から抽出）
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  return categories;
}

/**
 * ジャンル一覧を取得（カテゴリ別）
 */
export async function getGenresByCategory(category: string): Promise<string[]> {
  const posts = await getPostsByCategory(category);
  const genres = [...new Set(posts.map(post => post.genre))];
  return genres;
}
