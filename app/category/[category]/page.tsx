import { getPostsByCategory, getGenresByCategory, getAllCategories } from '@/lib/microcms';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map(category => ({
    category,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const genres = await getGenresByCategory(category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link href="/">ホーム</Link></li>
          <li>{category}</li>
        </ul>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category}の作品</h1>
        <p className="text-lg text-base-content/80">
          {category}の作品を紹介しています。気になる作品を見つけて、休日や通勤時間を充実させましょう。
        </p>
      </header>

      {/* Genres */}
      {genres.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">ジャンルから探す</h2>
          <div className="flex gap-2 flex-wrap">
            {genres.map(genre => (
              <Link
                key={genre}
                href={`/category/${category}/${genre}`}
                className="btn btn-outline"
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">最新の{category}作品</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure className="aspect-[16/9]">
                  <img
                    src={post.thumbnail?.url || '/images/placeholder.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex gap-2 mb-2">
                    <span className="badge badge-primary">{post.category}</span>
                    <span className="badge badge-outline">{post.genre}</span>
                  </div>
                  <h3 className="card-title text-lg">{post.title}</h3>
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {post.description}
                  </p>
                  {post.rating && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map(star => (
                          <input
                            key={star}
                            type="radio"
                            className="mask mask-star-2 bg-orange-400"
                            checked={Math.round(post.rating!) === star}
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm">{post.rating.toFixed(1)}</span>
                    </div>
                  )}
                  <div className="card-actions justify-end mt-4">
                    <span className="text-xs text-base-content/50">
                      {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="alert">
            <span>まだ記事がありません。</span>
          </div>
        )}
      </section>
    </div>
  );
}
