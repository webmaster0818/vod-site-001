import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMetadata {
  title: string;
  description: string;
  category: string;
  genre: string;
  releaseYear: number;
  rating: number;
  thumbnail: string;
  vodServices: {
    name: string;
    url: string;
    available: boolean;
  }[];
  tags: string[];
  publishedAt: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

/**
 * すべてのカテゴリを取得
 */
export function getAllCategories(): string[] {
  return fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * 特定カテゴリのすべてのジャンルを取得
 */
export function getGenresByCategory(category: string): string[] {
  const decodedCategory = decodeURIComponent(category);
  const categoryPath = path.join(contentDirectory, decodedCategory);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  return fs.readdirSync(categoryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

/**
 * すべての記事を取得
 */
export function getAllPosts(): PostMetadata[] {
  const categories = getAllCategories();
  const posts: PostMetadata[] = [];

  categories.forEach(category => {
    const genres = getGenresByCategory(category);
    
    genres.forEach(genre => {
      const genrePath = path.join(contentDirectory, category, genre);
      const files = fs.readdirSync(genrePath)
        .filter(file => file.endsWith('.md') && !file.startsWith('_'));

      files.forEach(file => {
        const filePath = path.join(genrePath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        posts.push({
          ...(data as Omit<PostMetadata, 'slug'>),
          slug: `${category}/${genre}/${file.replace(/\.md$/, '')}`,
        });
      });
    });
  });

  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * 特定カテゴリの記事を取得
 */
export function getPostsByCategory(category: string): PostMetadata[] {
  const decodedCategory = decodeURIComponent(category);
  return getAllPosts().filter(post => post.category === decodedCategory);
}

/**
 * 特定ジャンルの記事を取得
 */
export function getPostsByGenre(category: string, genre: string): PostMetadata[] {
  const decodedCategory = decodeURIComponent(category);
  const decodedGenre = decodeURIComponent(genre);
  return getAllPosts().filter(
    post => post.category === decodedCategory && post.genre === decodedGenre
  );
}

/**
 * スラッグから記事を取得
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);

  // Markdownを HTMLに変換
  const processedContent = await remark()
    .use(html)
    .process(markdownContent);
  const contentHtml = processedContent.toString();

  return {
    ...(data as Omit<PostMetadata, 'slug'>),
    slug,
    content: contentHtml,
  };
}
