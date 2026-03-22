import { getAllPosts } from '@/lib/microcms';
import Link from 'next/link';

export const revalidate = 60; // 60秒ごとにISR

export default async function Home() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 12);
  const categories = ['映画', 'ドラマ', 'アニメ', 'ライブ', 'スポーツ'];

  return (
    <main className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-gradient-to-r from-primary to-secondary">
        <div className="hero-content text-center text-primary-content">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              あなたにぴったりの作品を見つけよう
            </h1>
            <p className="text-xl mb-8">
              映画・ドラマ・アニメ・ライブ・スポーツまで、幅広いジャンルの作品を紹介。
              <br />
              通勤時間や休日の暇つぶしに最適な作品が見つかります。
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {categories.map(category => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className="btn btn-primary btn-lg"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">最新の作品紹介</h2>
        
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestPosts.map(post => (
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
            <span>まだ記事がありません。microCMSで最初の記事を作成してください。</span>
          </div>
        )}
      </section>

      {/* VOD Services */}
      <section className="bg-base-300 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">対応VODサービス</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Netflix', 'Amazon Prime Video', 'Disney+', 'U-NEXT', 'Hulu', 'dアニメストア', 'ABEMA', 'DAZN'].map(service => (
              <div key={service} className="card bg-base-100 shadow-md text-center p-6">
                <h3 className="font-bold">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
