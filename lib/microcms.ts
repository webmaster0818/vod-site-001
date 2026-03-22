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

/**
 * categoryが配列の場合は最初の要素を返す
 */
function normalizeCategory(category: string | string[]): string {
  return Array.isArray(category) ? category[0] : category;
}

// 型定義
export interface VODService {
  fieldId: string;
  name: string;
  url: string;
  available: boolean;
}

interface PostRaw {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  category: string | string[]; // microCMSの複数選択対応
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

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  category: string; // 正規化後は常に文字列
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
  contents: PostRaw[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * Postデータを正規化（categoryを文字列に変換）
 */
function normalizePost(post: PostRaw): Post {
  return {
    ...post,
    category: normalizeCategory(post.category),
  };
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
    return data.contents.map(normalizePost);
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
    // categoryが配列の場合、microCMSのfiltersでcontains検索を使用
    const data = await client.get<PostsResponse>({
      endpoint: 'posts',
      queries: {
        limit,
        filters: `category[contains]${category}`,
        orders: '-publishedAt',
      },
    });
    return data.contents.map(normalizePost);
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
    // categoryが配列の場合、microCMSのfiltersでcontains検索を使用
    const data = await client.get<PostsResponse>({
      endpoint: 'posts',
      queries: {
        limit,
        filters: `category[contains]${category}[and]genre[equals]${genre}`,
        orders: '-publishedAt',
      },
    });
    return data.contents.map(normalizePost);
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
    const data = await client.get<PostRaw>({
      endpoint: 'posts',
      contentId: id,
    });
    return normalizePost(data);
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
  const categories = [...new Set(posts.map(post => normalizeCategory(post.category)))];
  return categories;
}

/**
 * ジャンル一覧を取得（カテゴリ別）
 */
export async function getGenresByCategory(category: string): Promise<string[]> {
  const posts = await getPostsByCategory(category);
  const genres = [...new Set(posts.map(post => post.genre).filter(Boolean))];
  return genres;
}
