import { getAllPosts } from '@/lib/microcms';
import Link from 'next/link';

export default async function Home() {
  const allPosts = await getAllPosts();
  const latestPosts = allPosts.slice(0, 20);
  const categories = ['映画', 'ドラマ', 'アニメ', 'ライブ', 'スポーツ'];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - シンプルなデザイン */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            あなたにぴったりの作品を見つけよう
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            映画・ドラマ・アニメ・ライブ・スポーツまで、幅広いジャンルの作品を紹介。
            通勤時間や休日の暇つぶしに最適な作品が見つかります。
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {categories.map(category => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts - リスト形式 */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-4">最新の作品紹介</h2>
        
        {latestPosts.length > 0 ? (
          <div className="space-y-8">
            {latestPosts.map(post => (
              <article key={post.id} className="border-b border-gray-200 pb-8 last:border-none">
                <Link href={`/post/${post.id}`} className="group">
                  {/* タイトルと監督名（参考サイトスタイル） */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  
                  {/* メタ情報 */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {post.category}
                    </span>
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

                  {/* 説明文 */}
                  <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* サムネイル（小さめ・オプション） */}
                  {post.thumbnail && (
                    <div className="w-full md:w-48 aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={post.thumbnail.url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* 続きを読むリンク */}
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
            <p className="text-yellow-800">
              まだ記事がありません。microCMSで最初の記事を作成してください。
            </p>
          </div>
        )}
      </section>

      {/* VOD Services - シンプル化 */}
      <section className="bg-gray-50 py-12 mt-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-center">対応VODサービス</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {['Netflix', 'Prime Video', 'Disney+', 'U-NEXT', 'Hulu', 'dアニメ', 'ABEMA', 'DAZN'].map(service => (
              <div key={service} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm font-semibold text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
