import { getPostsByCategory, getGenresByCategory, getAllCategories } from '@/lib/microcms';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    return categories.length > 0 ? categories.map(category => ({ category })) : [];
  } catch (error) {
    console.warn('generateStaticParams failed, returning empty array:', error);
    return [];
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const genres = await getGenresByCategory(category);

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{category}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 pb-4 border-b-2 border-gray-200">
          {category}の作品
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          {category}の作品を紹介しています。気になる作品を見つけて、休日や通勤時間を充実させましょう。
        </p>

        {/* Genres - タグ風 */}
        {genres.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">ジャンルで絞り込み</h2>
            <div className="flex gap-2 flex-wrap">
              {genres.map(genre => (
                <Link
                  key={genre}
                  href={`/category/${category}/${genre}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Posts - リスト形式 */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map(post => (
              <article key={post.id} className="border-b border-gray-200 pb-8 last:border-none">
                <Link href={`/post/${post.id}`} className="group">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {post.genre}
                    </span>
                    {post.rating && (
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{post.rating.toFixed(1)}</span>
                      </span>
                    )}
                    <span className="text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {post.thumbnail && (
                    <div className="w-full md:w-48 aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={post.thumbnail.url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <span className="text-blue-600 group-hover:text-blue-800 font-semibold text-sm">
                      続きを読む →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <p className="text-yellow-800">このカテゴリの記事はまだありません。</p>
          </div>
        )}
      </div>
    </main>
  );
}
