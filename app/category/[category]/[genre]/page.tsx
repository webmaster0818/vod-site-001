import { getPostsByGenre, getAllCategories, getGenresByCategory } from '@/lib/microcms';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    category: string;
    genre: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories();
    const paths: { category: string; genre: string }[] = [];

    for (const category of categories) {
      const genres = await getGenresByCategory(category);
      genres.forEach(genre => {
        paths.push({ category, genre });
      });
    }

    // 記事がない場合は空配列を返す
    return paths.length > 0 ? paths : [];
  } catch (error) {
    console.warn('generateStaticParams failed, returning empty array:', error);
    // エラー時は空配列を返してビルド続行
    return [];
  }
}

export default async function GenrePage({ params }: PageProps) {
  const { category, genre } = await params;
  const posts = await getPostsByGenre(category, genre);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href={`/category/${category}`}>{category}</Link></li>
          <li>{genre}</li>
        </ul>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category} - {genre}の作品</h1>
        <p className="text-lg text-base-content/80">
          {genre}ジャンルの作品を紹介しています。
        </p>
      </header>

      {/* Posts */}
      <section>
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

      {/* Back to Category */}
      <div className="mt-8">
        <Link href={`/category/${category}`} className="btn btn-outline">
          {category}の一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
