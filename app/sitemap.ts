import { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories, getGenresByCategory } from '@/lib/microcms'

const BASE_URL = 'https://movie-watchers.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // トップページ
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })

  try {
    // カテゴリページ
    const categories = await getAllCategories()
    for (const category of categories) {
      entries.push({
        url: `${BASE_URL}/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })

      // ジャンルページ
      try {
        const genres = await getGenresByCategory(category)
        for (const genre of genres) {
          entries.push({
            url: `${BASE_URL}/category/${category}/${encodeURIComponent(genre)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        }
      } catch {
        // ジャンル取得に失敗した場合はスキップ
      }
    }

    // 記事ページ
    const posts = await getAllPosts(1000)
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/post/${post.id}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  } catch (error) {
    console.warn('Sitemap generation: microCMS data fetch failed:', error)
  }

  return entries
}
